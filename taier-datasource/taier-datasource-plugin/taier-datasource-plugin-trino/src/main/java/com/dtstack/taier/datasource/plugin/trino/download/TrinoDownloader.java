/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.dtstack.taier.datasource.plugin.trino.download;

import com.dtstack.taier.datasource.api.downloader.IDownloader;
import com.dtstack.taier.datasource.plugin.common.utils.DBUtil;
import com.dtstack.taier.datasource.plugin.common.utils.SqlFormatUtil;
import com.dtstack.taier.datasource.api.dto.Column;
import com.dtstack.taier.datasource.api.exception.SourceException;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * trino数据下载器
 *
 * @author luming
 * date 2022年05月23日
 */
public class TrinoDownloader implements IDownloader {

    private int pageNum;

    private int pageAll;

    private List<Column> columnNames;

    private final Connection connection;

    private final String sql;

    private Statement statement;

    private int pageSize;

    private int columnCount;

    public TrinoDownloader(Connection connection, String sql) {
        this.connection = connection;
        this.sql = SqlFormatUtil.formatSql(sql);
    }

    @Override
    public boolean configure() throws Exception {
        if (null == connection || StringUtils.isEmpty(sql)) {
            throw new SourceException("file is not exist");
        }
        int totalLine = 0;
        pageSize = 100;
        pageNum = 1;
        statement = connection.createStatement();

        String countSQL = String.format("SELECT COUNT(*) FROM (%s) temp", sql);
        String showColumns = String.format("SELECT * FROM (%s) t limit 1", sql);

        ResultSet totalResultSet = null;
        ResultSet columnsResultSet = null;
        try {
            totalResultSet = statement.executeQuery(countSQL);
            while (totalResultSet.next()) {
                //获取总行数
                totalLine = totalResultSet.getInt(1);
            }
            columnsResultSet = statement.executeQuery(showColumns);
            //获取列信息
            columnNames = new ArrayList<>();
            columnCount = columnsResultSet.getMetaData().getColumnCount();
            for (int i = 1; i <= columnCount; i++) {
                Column column = new Column();
                column.setName(columnsResultSet.getMetaData().getColumnName(i));
                column.setType(columnsResultSet.getMetaData().getColumnTypeName(i));
                column.setIndex(i);
                columnNames.add(column);
            }
            //无字段时处理
            if (CollectionUtils.isEmpty(columnNames)){
                pageAll = 0;
            }
            //获取总页数
            pageAll = (int) Math.ceil(totalLine / (double) pageSize);
        } catch (Exception e) {
            throw new SourceException("build trino downloader message exception : " + e.getMessage(), e);
        } finally {
            if (totalResultSet != null) {
                totalResultSet.close();
            }
            if (columnsResultSet != null) {
                columnsResultSet.close();
            }
        }
        return true;
    }

    @Override
    public List<String> getMetaInfo() {
        if (CollectionUtils.isNotEmpty(columnNames)) {
            return columnNames.stream().map(Column::getName).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public List<List<String>> readNext() {
        //分页查询，一次一百条，并且强制取第一行进行升序排序（由于trino本身不指定的话是无序的会导致数据错乱）
        String limitSQL = String.format("SELECT * FROM (%s) t order by t.%s offset %s limit %s", sql, columnNames.get(0).getName(), pageSize * (pageNum - 1), pageSize);
        List<List<String>> pageTemp = new ArrayList<>(100);

        try (ResultSet resultSet = statement.executeQuery(limitSQL)) {
            while (resultSet.next()) {
                List<String> columns = new ArrayList<>(columnCount);
                for (int i = 1; i <= columnCount; i++) {
                    columns.add(resultSet.getString(i));
                }
                pageTemp.add(columns);
            }
        } catch (Exception e) {
            throw new SourceException("read trino message exception : " + e.getMessage(), e);
        }

        pageNum++;
        return pageTemp;
    }

    @Override
    public boolean reachedEnd() {
        return pageAll < pageNum;
    }

    @Override
    public boolean close() throws Exception {
        DBUtil.closeDBResources(null, statement, connection);
        return true;
    }
}