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

import molecule from '@dtinsight/molecule/esm';
import { message } from 'antd';
import { LoginOutlined, UploadOutlined, SwapOutlined } from '@ant-design/icons';
import type { IEditorActionsProps } from '@dtinsight/molecule/esm/model';
import { FileTypes, TreeNodeModel } from '@dtinsight/molecule/esm/model';
import { FlinkSQLIcon, SyntaxIcon, HiveSQLIcon, SparkSQLIcon } from '@/components/icon';
import api from '@/api';
import functionManagerService from '@/services/functionManagerService';
import resourceManagerTree from '@/services/resourceManagerService';
import type { RESOURCE_TYPE } from '@/constant';
import { TASK_SYNTAX_ID } from '@/constant';
import {
	TASK_CONVERT_SCRIPT,
	TASK_OPS_ID,
	TASK_SUBMIT_ID,
	OUTPUT_LOG,
	TASK_SAVE_ID,
	CREATE_MODEL_TYPE,
	CATELOGUE_TYPE,
	TASK_RUN_ID,
	TASK_STOP_ID,
	TASK_TYPE_ENUM,
} from '@/constant';
import type { CatalogueDataProps, IOfflineTaskProps } from '@/interface';
import executeService from '@/services/executeService';
import taskResultService from '@/services/taskResultService';
import Result from '@/components/task/result';
import { filterSql, getTenantId, getUserId } from '.';
import stream from '@/api/stream';
import { createLog } from 'dt-react-codemirror-editor';

/**
 * 保存按钮 for toolbar
 */
const SAVE_TASK: IEditorActionsProps = {
	id: TASK_SAVE_ID,
	name: 'Save Task',
	title: '保存',
	icon: 'save',
	place: 'outer',
};

/**
 * 运行任务按钮 for toolbar
 */
const RUN_TASK: IEditorActionsProps = {
	id: TASK_RUN_ID,
	name: 'Run Task',
	title: '运行',
	icon: 'play',
	place: 'outer',
};

/**
 * 停止任务按钮 for toolbar
 */
const STOP_TASK: IEditorActionsProps = {
	id: TASK_STOP_ID,
	name: 'Stop Task',
	title: '停止运行',
	icon: 'debug-pause',
	place: 'outer',
};

/**
 * 提交至调度按钮
 */
const SUBMIT_TASK: IEditorActionsProps = {
	id: TASK_SUBMIT_ID,
	name: '提交至调度',
	title: '提交至调度',
	icon: <UploadOutlined />,
	place: 'outer',
};

/**
 * 任务运维按钮
 */
const OPERATOR_TASK: IEditorActionsProps = {
	id: TASK_OPS_ID,
	name: '运维',
	title: '运维',
	icon: <LoginOutlined />,
	place: 'outer',
};

/**
 * 转换为脚本按钮
 */
const CONVERT_TASK: IEditorActionsProps = {
	id: TASK_CONVERT_SCRIPT,
	name: '转换为脚本',
	title: '转换为脚本',
	icon: <SwapOutlined />,
	place: 'outer',
};

/**
 * 导入模板按钮
 */
// const IMPORT_TASK: IEditorActionsProps = {
// 	id: TASK_IMPORT_ID,
// 	name: '引入数据源',
// 	title: '引入数据源',
// 	icon: <ImportOutlined />,
// 	place: 'outer',
// };

/**
 * 语法检查按钮
 */
const GRAMMAR_TASK: IEditorActionsProps = {
	id: TASK_SYNTAX_ID,
	name: '语法检查',
	title: '语法检查',
	icon: <SyntaxIcon />,
	place: 'outer',
};

export function resetEditorGroup() {
	molecule.editor.updateActions([
		{ id: TASK_RUN_ID, disabled: true },
		{ id: TASK_STOP_ID, disabled: true },
	]);
}

/**
 * 定义不同的任务具有不同的 Toolbar
 */
export function getToolbar(taskType: TASK_TYPE_ENUM, isGuide?: boolean) {
	switch (taskType) {
		case TASK_TYPE_ENUM.SYNC: {
			if (isGuide) {
				return [CONVERT_TASK, SAVE_TASK, RUN_TASK, STOP_TASK, SUBMIT_TASK, OPERATOR_TASK];
			}
			return [
				// IMPORT_TASK,
				SAVE_TASK,
				RUN_TASK,
				STOP_TASK,
				SUBMIT_TASK,
				OPERATOR_TASK,
			];
		}
		case TASK_TYPE_ENUM.SQL:
			if (isGuide) {
				return [CONVERT_TASK, GRAMMAR_TASK, SAVE_TASK, SUBMIT_TASK, OPERATOR_TASK];
			}
			return [
				// IMPORT_TASK,
				SAVE_TASK,
				SUBMIT_TASK,
				OPERATOR_TASK,
			];
		case TASK_TYPE_ENUM.SPARK:
		case TASK_TYPE_ENUM.HIVE_SQL:
		default:
			return [SAVE_TASK, RUN_TASK, STOP_TASK, SUBMIT_TASK, OPERATOR_TASK];
	}
}

/**
 * 针对不同的任务类型，渲染不同的 `toolbar`
 * @notice 需要确保 `current` 是数据是正确的
 */
export function performSyncTaskActions() {
	const { current } = molecule.editor.getState();
	if (current?.tab?.data) {
		const currentTabData: CatalogueDataProps & IOfflineTaskProps = current?.tab?.data;
		const taskToolbar = getToolbar(
			currentTabData.taskType,
			currentTabData.createModel === CREATE_MODEL_TYPE.GUIDE,
		);
		molecule.editor.updateGroup(current.id, {
			actions: [...taskToolbar, ...molecule.editor.getDefaultActions()],
		});
	}
}

/**
 * 根据不同任务渲染不同的图标
 */
export function fileIcon(
	type: TASK_TYPE_ENUM | RESOURCE_TYPE,
	source: CATELOGUE_TYPE,
): string | JSX.Element {
	switch (source) {
		case CATELOGUE_TYPE.TASK: {
			switch (type) {
				case TASK_TYPE_ENUM.SPARK_SQL:
					return <SparkSQLIcon style={{ color: '#519aba' }} />;
				case TASK_TYPE_ENUM.SYNC:
					return 'sync';
				case TASK_TYPE_ENUM.HIVE_SQL:
					return <HiveSQLIcon style={{ color: '#4291f0' }} />;
				case TASK_TYPE_ENUM.SQL:
					return <FlinkSQLIcon style={{ color: '#5655d8' }} />;
				default:
					return 'file';
			}
		}
		case CATELOGUE_TYPE.RESOURCE: {
			return 'file';
		}
		case CATELOGUE_TYPE.FUNCTION:
		default:
			return 'code';
	}
}

/**
 * 异步加载树结点
 * @param node
 * @returns
 */
export async function getCatalogueViaNode(
	node: Partial<CatalogueDataProps>,
): Promise<CatalogueDataProps | undefined> {
	if (!node) throw new Error('[getCatalogueViaNode]: failed to get catelogue');
	const res = await api.getOfflineCatalogue({
		isGetFile: true,
		nodePid: node.id,
		catalogueType: node.catalogueType,
		userId: getUserId(),
		tenantId: getTenantId(),
	});
	if (res.code === 1) {
		return res.data;
	}
	return undefined;
}

/**
 * Transform the catalogue data from back-end to the tree structure
 * @param catalogue
 * @param source
 * @returns
 */
export function transformCatalogueToTree(
	catalogue: CatalogueDataProps | undefined,
	source: CATELOGUE_TYPE,
	isRootFolder: boolean = false,
): TreeNodeModel | undefined {
	const folderType = ['folder', 'catalogue'];
	if (!catalogue) return;
	switch (source) {
		case CATELOGUE_TYPE.RESOURCE: {
			const children = (catalogue.children || [])
				.map((child) => transformCatalogueToTree(child, source))
				.filter(Boolean) as TreeNodeModel[];

			const catalogueType = folderType.includes(catalogue.type)
				? FileTypes.Folder
				: FileTypes.File;

			const fileType = isRootFolder ? FileTypes.RootFolder : catalogueType;

			return new TreeNodeModel({
				// prevent same id between folder and file
				id: catalogue.id,
				name: catalogue.name,
				location: catalogue.name,
				fileType,
				icon: fileIcon(catalogue.resourceType, source),
				isLeaf: fileType === FileTypes.File,
				data: catalogue,
				children,
			});
		}
		case CATELOGUE_TYPE.TASK: {
			const children = (catalogue.children || [])
				.map((child) => transformCatalogueToTree(child, source))
				.filter(Boolean) as TreeNodeModel[];

			const catalogueType = folderType.includes(catalogue.type)
				? FileTypes.Folder
				: FileTypes.File;

			const fileType = isRootFolder ? FileTypes.RootFolder : catalogueType;

			// If the node already stored in folderTree, then use it
			const prevNode = molecule.folderTree.get(
				fileType === FileTypes.File ? catalogue.id : `${catalogue.id}-folder`,
			);
			// file always generate the new one
			if (prevNode && fileType !== FileTypes.File) {
				return new TreeNodeModel({
					id: prevNode.id,
					name: prevNode.name,
					location: prevNode.location,
					fileType: prevNode.fileType,
					icon: prevNode.icon,
					isLeaf: prevNode.isLeaf,
					data: catalogue,
					children: children.map((cNode) => {
						// change the locations to like 「root/abc」 so that render breadcrumbs correctly
						// eslint-disable-next-line no-param-reassign
						cNode.location = `${prevNode.location}/${cNode.location}`;
						return cNode;
					}),
				});
			}

			return new TreeNodeModel({
				// prevent same id between folder and file
				id: fileType === FileTypes.File ? catalogue.id : `${catalogue.id}-folder`,
				name: catalogue.name,
				location: catalogue.name,
				fileType,
				icon: fileIcon(catalogue.taskType, source),
				isLeaf: fileType === FileTypes.File,
				data: catalogue,
				children,
			});
		}
		case CATELOGUE_TYPE.FUNCTION: {
			const { id, type, name } = catalogue;
			const children = (catalogue.children || [])
				// there is a system function in the children node of root folder, we'd better to filter it
				.filter((child) => !isRootFolder || child.name !== '系统函数')
				.map((child) => transformCatalogueToTree(child, source))
				.filter(Boolean) as TreeNodeModel[];

			const catalogueType = folderType.includes(type) ? FileTypes.Folder : FileTypes.File;

			const fileType = isRootFolder ? FileTypes.RootFolder : catalogueType;

			// Because of the same id in different levels, so we should set another uniq id for each tree node
			return new TreeNodeModel({
				id: `${id}-${folderType.includes(type) ? 'folder' : 'file'}`,
				name,
				location: name,
				fileType,
				isLeaf: fileType === FileTypes.File,
				data: catalogue,
				icon: fileIcon(catalogue.taskType, source),
				children,
			});
		}

		default:
			return undefined;
	}
}

/**
 * Get the children data in node and save it into Service
 * @param node
 * @param source
 */
export async function loadTreeNode(
	node: CatalogueDataProps,
	source: CATELOGUE_TYPE,
): Promise<TreeNodeModel | null> {
	const data = await getCatalogueViaNode(node);
	const nextNode = transformCatalogueToTree(data, source);
	if (!nextNode) {
		message.error('load tree node failed');
		return null;
	}
	switch (source) {
		case 'task': {
			molecule.folderTree.update(nextNode);
			break;
		}
		case 'resource':
			resourceManagerTree.update(nextNode);
			break;
		case 'function':
			functionManagerService.update(nextNode);
			break;
		default:
			break;
	}
	return nextNode;
}

/**
 * 运行任务
 */
export function runTask(current: molecule.model.IEditorGroup) {
	const currentTabData:
		| (CatalogueDataProps & IOfflineTaskProps & { value?: string })
		| undefined = current.tab?.data;
	if (currentTabData) {
		// 禁用运行按钮，启用停止按钮
		molecule.editor.updateActions([
			{
				id: TASK_RUN_ID,
				icon: 'loading~spin',
				disabled: true,
			},
			{
				id: TASK_STOP_ID,
				disabled: false,
			},
		]);

		// active 日志 窗口
		const { data } = molecule.panel.getState();
		const {
			panel: { hidden },
		} = molecule.layout.getState();
		if (hidden) {
			molecule.layout.togglePanelVisibility();
		}
		molecule.panel.setState({
			current: data?.find((item) => item.id === OUTPUT_LOG),
		});

		if (currentTabData.taskType === TASK_TYPE_ENUM.SYNC) {
			const params: any = {
				taskId: currentTabData.id,
				name: currentTabData.name,
				taskParams: currentTabData.taskParams,
			};
			executeService.execDataSync(currentTabData.id, params).finally(() => {
				// update the status of buttons
				molecule.editor.updateActions([
					{
						id: TASK_SAVE_ID,
						disabled: false,
					},
					{
						id: TASK_RUN_ID,
						icon: 'play',
						disabled: false,
					},
					{
						id: TASK_STOP_ID,
						disabled: true,
					},
				]);
			});
		} else {
			const params = {
				taskVariables: currentTabData.taskVariables || [],
				// 是否为单 session 模式, 为 true 时，支持batchSession 时，则支持批量SQL，false 则相反
				singleSession: false,
				taskParams: currentTabData.taskParams,
			};

			const value = currentTabData.value || '';
			// 需要被执行的 sql 语句
			const sqls = [];
			const rawSelections = molecule.editor.editorInstance.getSelections() || [];
			// 排除鼠标 focus 在 editor 中的情况
			const selections = rawSelections.filter(
				(s) => s.startLineNumber !== s.endLineNumber || s.startColumn !== s.endColumn,
			);
			// 如果存在选中行，则执行选中行
			if (selections?.length) {
				selections?.forEach((s) => {
					const text = molecule.editor.editorInstance.getModel()?.getValueInRange(s);
					if (text) {
						sqls.push(...filterSql(text));
					}
				});
			} else {
				sqls.push(...filterSql(value));
			}
			executeService
				.execSql(currentTabData.id, currentTabData, params, sqls)
				.then(() => {
					const allResult = taskResultService.getState().results;
					Object.keys(allResult).forEach((key) => {
						const results = allResult[key];
						const panel = molecule.panel.getPanel(key);

						if (!panel) {
							const panels = molecule.panel.getState().data || [];
							const resultPanles = panels.filter((p) => p.name?.includes('结果'));
							const lastIndexOf = Number(
								resultPanles[resultPanles.length - 1]?.name?.slice(2) || '',
							);

							molecule.panel.open({
								id: key,
								name: `结果 ${lastIndexOf + 1}`,
								closable: true,
								renderPane: () => (
									<Result
										data={results}
										tab={{
											tableType: 0,
										}}
										extraView={null}
									/>
								),
							});
						}
					});
				})
				.finally(() => {
					// update the status of buttons
					molecule.editor.updateActions([
						{
							id: TASK_SAVE_ID,
							disabled: false,
						},
						{
							id: TASK_RUN_ID,
							icon: 'play',
							disabled: false,
						},
						{
							id: TASK_STOP_ID,
							disabled: true,
						},
					]);
				});
		}
	}
}

/**
 * 语法检查
 */
export function syntaxValidate(current: molecule.model.IEditorGroup) {
	const currentTabData: IOfflineTaskProps | undefined = current.tab?.data;
	if (!currentTabData) return;
	// 禁用语法检查
	molecule.editor.updateActions([
		{
			id: TASK_SYNTAX_ID,
			icon: 'loading~spin',
			disabled: true,
		},
	]);

	// active 日志 窗口
	const { data } = molecule.panel.getState();
	const {
		panel: { hidden },
	} = molecule.layout.getState();
	if (hidden) {
		molecule.layout.togglePanelVisibility();
	}
	molecule.panel.setState({
		current: data?.find((item) => item.id === OUTPUT_LOG),
	});

	const logId = currentTabData.id.toString();
	taskResultService.clearLogs(logId);
	taskResultService.appendLogs(logId, createLog('语法检查开始', 'info'));

	let isSuccess = false;
	stream
		.checkSyntax({})
		.then((res) => {
			if (res.message) {
				taskResultService.appendLogs(logId, createLog(res.message, 'error'));
			}
			if (res && res.code === 1) {
				if (res.data.code === 1) {
					taskResultService.appendLogs(logId, createLog('语法检查通过', 'info'));
					isSuccess = true;
				} else {
					taskResultService.appendLogs(logId, createLog(res.data.errorMsg, 'error'));
				}
			}
		})
		.catch((e) => {
			console.trace(e);
		})
		.finally(() => {
			if (!isSuccess) {
				taskResultService.appendLogs(logId, createLog('语法检查失败！', 'error'));
			}
			// 恢复语法检查按钮
			molecule.editor.updateActions([
				{
					id: TASK_SYNTAX_ID,
					icon: <SyntaxIcon />,
					disabled: false,
				},
			]);
		});
}
