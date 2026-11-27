const items = [
 {type:'FE',id:'FE-2841',name:'智能编排引擎能力升级',desc:'优化智能编排能力，支持多任务并行与资源调度',status:'执行中',agent:'AG-1028',priority:'高'},
 {type:'MR',id:'MR-1028',name:'服务A核心接口变更',desc:'涉及服务A v2 接口定义调整及兼容性评估',status:'分配中',agent:'AG-1019',priority:'中'},
 {type:'DTS',id:'DTS-0841',name:'多团队协作需求',desc:'评审多团队协作流程与信息触达',status:'待处理',priority:'中'},
 {type:'RR',id:'RR-5672',name:'数据链路策略优化',desc:'完善数据分层策略与链路稳定性',status:'待处理',priority:'低'},
 {type:'US',id:'US-3320',name:'用户体验改进建议',desc:'基于用户反馈的导航与操作体验优化',status:'执行中',agent:'AG-1030',priority:'高'},
 {type:'FE',id:'FE-2977',name:'页面性能优化',desc:'分析并优化页面加载与交互性能',status:'待处理',priority:'中'},
 {type:'FE',id:'FE-3021',name:'工作台组件升级',desc:'改进组件的可访问性与兼容性',status:'待处理',priority:'中'},
 {type:'FE',id:'FE-3068',name:'任务详情页面优化',desc:'完善任务详情与状态展示',status:'待处理',priority:'低'},
 {type:'RR',id:'RR-5701',name:'接口稳定性提升',desc:'检查关键接口的可用性与稳定性',status:'待处理',priority:'高'},
 {type:'US',id:'US-3350',name:'用户反馈处理',desc:'整理并处理近期用户反馈',status:'待处理',priority:'中'},
 {type:'DTS',id:'DTS-0852',name:'交付流程优化',desc:'梳理跨团队交付流程',status:'待处理',priority:'中'},
 {type:'DTS',id:'DTS-0860',name:'任务协作需求',desc:'完善协作过程中的消息通知',status:'待处理',priority:'低'}
];
// 部门类别与来源系统；待办仍为本地演示数据。
const departmentSources = {
 '公共产品开发与IT装备部': {RR:'edevops',FE:'edevops',US:'edevops',DTS:'dts',MR:'codehub'},
 'MAE-CN产品部': {RR:'CoreALM',IR:'CoreALM',SR:'CoreALM',US:'CoreALM',DTS:'dts',MR:'codehub'}
};
let demoDepartment='公共产品开发与IT装备部';
function currentDepartment(){return demoDepartment;}
function renderDepartment(){
 const department=currentDepartment(), sources=departmentSources[department];
 $('departmentName').textContent=department||'未识别';
 $('departmentHint').textContent='演示数据';
 const visibleSources = sources ? Object.entries(sources).filter(([type])=>activeType==='全部'||type===activeType) : [];
 $('sourceSystems').textContent=visibleSources.length ? visibleSources.map(([type,source])=>`${type}：${source}`).join('　') : department ? '该部门暂无来源系统配置' : '请提供部门信息或选择演示部门';
}
const maeExtraItems = [
 {type:'SR',id:'SR-1001',name:'服务请求处理',desc:'跟踪并处理服务请求',status:'待处理',priority:'中'},
 {type:'SR',id:'SR-1002',name:'服务需求评估',desc:'评估服务请求并制定处理方案',status:'待处理',priority:'低'}
];
function departmentItems(){
 if(currentDepartment() !== 'MAE-CN产品部') return items;
 return [...items.map(x=>x.type==='FE'?{...x,type:'IR',id:x.id.replace(/^FE-/, 'IR-')}:x), ...maeExtraItems];
}
function countsFor(list){const order=currentDepartment()==='MAE-CN产品部'?['RR','IR','SR','US','DTS','MR']:['RR','FE','US','DTS','MR'];return Object.fromEntries([['全部',list.length],...order.map(type=>[type,list.filter(x=>x.type===type).length])]);}
let selected=new Set([currentDepartment()==='MAE-CN产品部'?'IR-2841':'FE-2841','MR-1028','US-3320']), activeType='全部', page=1, dialogAction=null;
const $=id=>document.getElementById(id), statusClass={'执行中':'running','分配中':'review','已完成':'done','失败':'failed','待处理':''};
function statusHTML(status){return `<span class="status ${statusClass[status]||''}">${status==='已完成'?'✓':status==='分配中'?'◷':status==='失败'?'⊗':'ϟ'} ${status}</span>`}
function statusWithParams(item){
 if(!item.agent)return statusHTML(item.status);
 const fields=item.fieldSnapshot;
 const preview=fields===undefined?'无下发参数记录':fields.length?fields.map(f=>`${f.name}：${f.value||'未填写'}`).join('\n'):'本次下发未配置补充字段';
 return `<span class="status-parameter"><button type="button" class="status-trigger" data-params="${escapeHTML(item.id)}" aria-label="${escapeHTML(item.status)}，查看下发参数">${statusHTML(item.status)}</button><span class="status-preview" role="tooltip"><strong>下发参数</strong>${escapeHTML(preview)}<small>点击状态查看完整信息</small></span></span>`;
}
function filtered(){return departmentItems().filter(x=>(activeType==='全部'||x.type===activeType)&&($('statusFilter').value==='全部'||x.status===$('statusFilter').value)&&($('priorityFilter').value==='全部'||x.priority===$('priorityFilter').value))}
function render(){
 document.querySelector('.count').textContent=departmentItems().length;
 renderDepartment(); document.querySelector('.tabs').innerHTML=Object.entries(countsFor(departmentItems())).map(([type,count])=>`<button class="tab ${type} ${activeType===type?'active':''}" data-type="${type}" aria-pressed="${activeType===type}">${type} ${count}</button>`).join('');
 const list=filtered(), pages=Math.max(1,Math.ceil(list.length/5));page=Math.min(page,pages);
 $('rows').innerHTML=list.slice((page-1)*5,page*5).map(x=>`<div class="row"><input type="checkbox" aria-label="选择 ${x.id}" data-select="${x.id}" ${selected.has(x.id)?'checked':''}><span class="tag ${x.type}">${x.type}</span><div class="item-summary"><button class="item-detail-trigger" data-detail="${x.id}" aria-label="查看 ${x.id} 详情"><span class="item-name">${x.id}&nbsp; ${x.name}</span><span class="detail-hint">详情 ⓘ</span></button><div class="item-desc">${x.desc}</div><div class="detail-preview" role="tooltip"><span>需求编号 <b>${x.id}</b></span><span>需求标题 <b>${x.name}</b></span><span>需求描述 <b>${x.desc}</b></span><small>点击标题查看完整详情</small></div><div class="item-source">来源：${departmentSources[currentDepartment()]?.[x.type] || '暂无配置'} ${sourceEntry(x)}${x.plan ? ' · 执行方案：'+escapeHTML(x.plan) : ''}</div></div><div><div class="status-line">${statusWithParams(x)}</div></div><div class="agent-id">${x.agent?escapeHTML(x.agent)+' ↗':''}</div><button class="row-action ${x.status==='待处理'||x.status==='失败'?'primary':''}" data-action="${x.id}">${x.status==='待处理'?'ϟ&nbsp; 交给 Agent':x.status==='失败'?'重试':(x.status==='执行中'||x.status==='分配中')?'前往 AgentSpace ↗':'查看结果'}</button><button class="more" data-more="${x.id}" aria-label="${x.id} 更多操作">•••</button></div>`).join('')||'<div class="empty">没有符合条件的待办</div>';
 $('selectedCount').textContent=`已选 ${selected.size} 项`; $('pageInfo').textContent=`${page} / ${pages}`; $('prev').disabled=page===1;$('next').disabled=page===pages;
 const tracked=departmentItems().filter(x=>x.agent);
 const statuses=[['分配中','#ff8c16'],['执行中','#1856ff'],['失败','#f1244b'],['已完成','#36c94e']];
 $('totalTasks').textContent=tracked.length;
 $('legend').innerHTML=statuses.map(([label,color])=>`<li><i style="--color:${color}"></i>${label}<b>${tracked.filter(x=>x.status===label).length}</b></li>`).join('');
 $('activityRows').innerHTML=tracked.map(x=>`<div class="activity-row"><div class="activity-name"><span class="bolt">ϟ</span>${x.agent} ・ ${x.id} ${x.name}${x.plan?`<span class="activity-plan">${escapeHTML(x.plan)} · ${escapeHTML(x.planCode)}</span>`:''}</div><div class="activity-end">${statusHTML(x.status)}<button class="params-link" data-params="${escapeHTML(x.id)}">查看下发参数</button></div></div>`).join('')||'<div class="empty">暂无 Agent 任务</div>';
}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').classList.remove('show'),3000)}
function modal(title,content,action,confirm='确认'){$('dialogTitle').textContent=title;$('dialogContent').textContent=content;$('confirmDialog').textContent=confirm;dialogAction=action;$('dialog').showModal()}
// 工作台提供空间标识；演示以单个模拟空间代替实际上下文。
const demoSpaceId='demo-space';
// 演示以当前 Widget 使用的部门配置模拟空间可用对象；实际由 Host 空间配置提供。
function currentSpaceObjectTypes(){return Object.keys(departmentSources[currentDepartment()]||{});}
const customPlans=[];
function plansFor(type){return customPlans.filter(p=>p.spaceId===demoSpaceId&&p.type===type&&p.enabled);}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
let editingPlanId=null, draftFields=[];
function renderFields(){ $('fieldList').innerHTML=draftFields.map((f,i)=>`<div class="field-card" data-field="${i}"><div class="field-grid"><label>字段名称<input data-prop="name" value="${escapeHTML(f.name)}" ${f.preset?'readonly':''}></label><label>英文标识<input data-prop="key" value="${escapeHTML(f.key)}" ${f.locked||f.preset?'readonly':''} placeholder="例如 issue_context"></label><label>字段类型<select data-prop="type" ${f.preset?'disabled':''}><option value="text" ${f.type==='text'?'selected':''}>单行文本</option><option value="textarea" ${f.type==='textarea'?'selected':''}>多行文本</option><option value="select" ${f.type==='select'?'selected':''}>单选下拉框</option></select></label><label class="field-check"><input type="checkbox" data-prop="required" ${f.required?'checked':''}> 必填</label>${f.type==='select'?`<label class="field-wide">下拉选项（每行一个）<textarea data-prop="options">${escapeHTML((f.options||[]).join('\n'))}</textarea></label>`:''}</div><button type="button" data-remove-field="${i}">移除字段</button></div>`).join('')||'<p class="field-empty">尚未添加字段，下发时不会显示补充信息。</p>'; }
$('addField').onclick=()=>{draftFields.push({name:'',key:'',type:'text',required:false,options:[]});renderFields()};
$('fieldList').addEventListener('input',e=>{const card=e.target.closest('[data-field]');if(!card||!e.target.dataset.prop)return;const f=draftFields[Number(card.dataset.field)],prop=e.target.dataset.prop;f[prop]=prop==='required'?e.target.checked:prop==='options'?e.target.value.split('\n'):e.target.value});
$('fieldList').addEventListener('change',e=>{if(e.target.dataset.prop==='type')renderFields()});
$('fieldList').addEventListener('click',e=>{if(e.target.dataset.removeField!==undefined){draftFields.splice(Number(e.target.dataset.removeField),1);renderFields()}});
function renderDispatchFields(){const fields=selectedPlan?.fields||[];$('dispatchFields').innerHTML=fields.length?`<h3>补充信息</h3><p>根据所选方案填写；未标记必填的字段可留空。</p>${fields.map((f,i)=>`<label>${escapeHTML(f.name)} ${f.required?'<b class="required">必填</b>':'<small>选填</small>'}${f.type==='select'?`<select data-input-field="${i}"><option value="">请选择</option>${f.options.map(o=>`<option value="${escapeHTML(o)}">${escapeHTML(o)}</option>`).join('')}</select>`:f.type==='textarea'?`<textarea data-input-field="${i}"></textarea>`:`<input data-input-field="${i}" type="text" ${f.preset==='log'?'placeholder="填写目标 Host 可访问的路径"':''}>`}</label>`).join('')}<p id="dispatchError" class="config-error" role="alert"></p>`:'';}

let pendingCandidates=[], selectedPlan=null, availablePlans=[];
function completeDispatch(candidates, plan, values=[]){
 candidates.forEach((x,i)=>{const original=items.find(item=>item.id===(x.type==='IR'?x.id.replace(/^IR-/, 'FE-'):x.id))||x;original.status='分配中';original.agent=`AG-${1040+i}`;original.plan=plan?.name||'';original.planCode=plan?.code||'';original.fieldSnapshot=JSON.parse(JSON.stringify(values))});
 render();toast(`已模拟派发 ${candidates.length} 项任务${plan?' · '+plan.name:''}`);
}
function dispatch(ids){
 const candidates=departmentItems().filter(x=>ids.includes(x.id)&&(x.status==='待处理'||x.status==='失败'));
 if(!candidates.length){toast('所选待办中没有可派发的任务');return}
 const types=[...new Set(candidates.map(x=>x.type))];
 const hasConfiguredPlans=candidates.some(x=>plansFor(x.type).length);
 if(types.length>1&&hasConfiguredPlans){toast('所选项目没有共同执行方案，请按类别分别下发');return}
 availablePlans=types.length===1?plansFor(types[0]):[];
 if(availablePlans.length){
  pendingCandidates=candidates;selectedPlan=null;
  $('planObject').textContent=candidates.length===1?`${candidates[0].id}  ${candidates[0].name}`:'已选择的 '+types[0]+' 待办';
  $('planCount').textContent=`${candidates.length} 项`;
  $('planOptions').innerHTML=availablePlans.map(p=>`<label class="plan-option"><input type="radio" name="executionPlan" value="${escapeHTML(p.id)}"><span><strong>${escapeHTML(p.name)}${p.role?`<span class="plan-role">${escapeHTML(p.role)} 常用</span>`:''}</strong><span class="plan-desc">${escapeHTML(p.desc)}</span><span class="plan-target">executionPlan：${escapeHTML(p.code)}</span></span></label>`).join('');
  $('submitPlan').disabled=true;renderDispatchFields();$('planDialog').showModal();return;
 }
 modal('交给 Agent',`将 ${candidates.length} 项待办交给 Agent 执行？这是本地演示，不会连接实际服务。`,()=>completeDispatch(candidates,null),'确认派发');
}
$('planOptions').addEventListener('change',e=>{selectedPlan=availablePlans.find(p=>p.id===e.target.value);$('submitPlan').disabled=!selectedPlan;renderDispatchFields()});
$('closePlan').onclick=()=>$('planDialog').close();$('cancelPlan').onclick=()=>$('planDialog').close();
$('submitPlan').onclick=()=>{if(!selectedPlan)return;const fields=selectedPlan.fields||[],inputs=[...$('dispatchFields').querySelectorAll('[data-input-field]')],values=fields.map((f,i)=>({...f,value:inputs[i].value.trim()}));if(values.some(f=>f.required&&!f.value)){$('dispatchError').textContent='请填写所有必填字段。';return}completeDispatch(pendingCandidates,selectedPlan,values);$('planDialog').close()};

function resetConfigForm(){
 editingPlanId=null;draftFields=[];renderFields();$('configType').innerHTML=currentSpaceObjectTypes().map(type=>`<option value="${type}">${type}</option>`).join('');$('configForm').reset();$('configType').disabled=false;$('configCode').disabled=false;
 $('configFormTitle').textContent='创建执行方案';$('saveConfig').textContent='创建方案';$('cancelEdit').hidden=true;$('configError').textContent='';
}
function renderConfigList(){
 const plans=customPlans.filter(p=>p.spaceId===demoSpaceId);
 $('configList').innerHTML=plans.length?plans.map(p=>`<div class="config-plan"><div><strong>${escapeHTML(p.name)}</strong><span>${escapeHTML(p.type)} · ${escapeHTML(p.code)} · ${p.enabled?'已启用':'已停用'}</span><small>${escapeHTML(p.desc)}</small></div><div class="config-plan-actions"><button type="button" data-edit-plan="${p.id}">编辑</button><button type="button" data-toggle-plan="${p.id}">${p.enabled?'停用':'启用'}</button><button type="button" data-delete-plan="${p.id}">删除</button></div></div>`).join(''):'<p class="config-empty">当前空间尚无执行方案</p>';
}
$('configurePlans').onclick=()=>{
 $('configType').innerHTML=currentSpaceObjectTypes().map(type=>`<option value="${type}">${type}</option>`).join('');
 resetConfigForm();if(activeType!=='全部') $('configType').value=activeType;renderConfigList();$('configDialog').showModal();
};
$('closeConfig').onclick=()=>$('configDialog').close();$('cancelEdit').onclick=resetConfigForm;
$('configList').onclick=e=>{
 const button=e.target.closest('[data-edit-plan],[data-toggle-plan],[data-delete-plan]');if(!button)return;
 const plan=customPlans.find(p=>p.id===(button.dataset.editPlan||button.dataset.togglePlan||button.dataset.deletePlan));if(!plan)return;
 if(button.dataset.editPlan){editingPlanId=plan.id;draftFields=JSON.parse(JSON.stringify(plan.fields||[])).map(f=>({...f,locked:true}));renderFields();if(![...$('configType').options].some(o=>o.value===plan.type)){const option=new Option(plan.type+'（当前不可新建）',plan.type);$('configType').add(option)}$('configType').value=plan.type;$('configType').disabled=true;$('configName').value=plan.name;$('configCode').value=plan.code;$('configCode').disabled=true;$('configDescription').value=plan.desc;$('configRole').value=plan.role;$('configFormTitle').textContent='编辑执行方案';$('saveConfig').textContent='保存修改';$('cancelEdit').hidden=false;$('configError').textContent='';return}
 if(button.dataset.togglePlan){plan.enabled=!plan.enabled;renderConfigList();return}
 if(window.confirm(`确定删除执行方案“${plan.name}”？已创建任务的方案信息会保留。`)){customPlans.splice(customPlans.indexOf(plan),1);if(editingPlanId===plan.id)resetConfigForm();renderConfigList()}
};
$('configForm').onsubmit=e=>{
 e.preventDefault();const type=$('configType').value,name=$('configName').value.trim(),code=$('configCode').value.trim(),desc=$('configDescription').value.trim(),role=$('configRole').value.trim();
 if(!editingPlanId&&!currentSpaceObjectTypes().includes(type)){$('configError').textContent='请选择当前空间使用的对象类别。';return}
 if(!type||!name||!code||!desc||!role){$('configError').textContent='请填写所有方案信息。';return}
 if(!/^[A-Za-z0-9_]+$/.test(code)){$('configError').textContent='英文名称只能包含英文字母、数字和下划线。';return}
 if(customPlans.some(p=>p.spaceId===demoSpaceId&&p.type===type&&p.code===code&&p.id!==editingPlanId)){$('configError').textContent='当前空间的该类别已存在相同英文名称。';return}
 for(const f of draftFields){f.name=f.name.trim();f.key=f.key.trim();f.options=(f.options||[]).map(x=>x.trim()).filter(Boolean);if(!f.name||!/^[A-Za-z][A-Za-z0-9_]*$/.test(f.key)||f.type==='select'&&(!f.options.length||new Set(f.options).size!==f.options.length)){$('configError').textContent='请填写字段名称、英文标识（字母开头，仅含字母数字和下划线）及不重复的下拉选项。';return}}
 if(new Set(draftFields.map(f=>f.key)).size!==draftFields.length){$('configError').textContent='同一方案内字段英文标识不能重复。';return}
 const fields=JSON.parse(JSON.stringify(draftFields));
 const existing=customPlans.find(p=>p.id===editingPlanId);
 if(existing){existing.name=name;existing.desc=desc;existing.role=role;existing.fields=fields}else customPlans.push({id:'custom-'+Date.now()+'-'+customPlans.length,spaceId:demoSpaceId,type,name,code,desc,role,fields,enabled:true});
 resetConfigForm();renderConfigList();toast(existing?'方案已更新':'方案已创建');
};
function sourceUrlFor(item){
 try {const url=new URL(item.sourceUrl);return ['https:','http:'].includes(url.protocol)?url.href:null;} catch {return null;}
}
function showParams(item){
 $('paramsObject').textContent=`${item.agent} · ${item.id} ${item.name}`;
 const values=item.fieldSnapshot;
 $('paramsBody').innerHTML=values===undefined?'<div class="params-empty">无下发参数记录</div>':values.length?`<div class="params-caption">本次下发的字段和值</div><dl>${values.map(f=>`<div class="params-row"><dt>${escapeHTML(f.name)}<small>${escapeHTML(f.key)}</small></dt><dd>${f.value?escapeHTML(f.value):'<span class="params-muted">未填写</span>'}</dd></div>`).join('')}</dl>`:'<div class="params-empty">本次下发未配置补充字段</div>';
 $('paramsDialog').showModal();
}
$('closeParams').onclick=()=>$('paramsDialog').close();$('doneParams').onclick=()=>$('paramsDialog').close();
$('activityRows').addEventListener('click',e=>{const button=e.target.closest('[data-params]');if(!button)return;const item=departmentItems().find(x=>x.id===button.dataset.params);if(item)showParams(item)});
function openAgentTask(item){
 const url=sourceUrlFor({sourceUrl:item.detailUrl});
 if(!url){toast('AgentSpace 任务地址尚未提供，当前为本地演示');return}
 window.open(url,'_blank','noopener,noreferrer');
}
function sourceEntry(item){
 const url=sourceUrlFor(item);
 return url?`<a class="source-entry" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="在原系统打开 ${escapeHTML(item.id)}">前往原系统 ↗</a>`:'<span class="source-unconfigured" title="原系统对象地址尚未配置">原系统地址未配置</span>';
}
function showItemDetail(item){
 $('detailTitle').textContent=item.id+' · '+item.name;
 $('detailId').textContent=item.id;
 $('detailName').textContent=item.name;
 $('detailDescription').textContent=item.desc || '暂无描述';
 $('detailSource').textContent=departmentSources[currentDepartment()]?.[item.type] || '暂无配置';
 $('detailStatus').textContent=item.status;
 $('detailParams').hidden=!item.agent;$('detailParams').onclick=()=>{ $('detailDialog').close();showParams(item) };
 $('detailAction').textContent=item.status==='待处理'?'ϟ 交给 Agent':item.status==='失败'?'重试':(item.status==='执行中'||item.status==='分配中')?'前往 AgentSpace ↗':'查看结果';
 $('detailAction').onclick=()=>{
  $('detailDialog').close();
  if(item.status==='待处理'||item.status==='失败') dispatch([item.id]);
  else openAgentTask(item);
 };
 let sourceUrl=null;
 sourceUrl=sourceUrlFor(item);
 $('sourceLink').hidden=!sourceUrl;$('sourceUnavailable').hidden=!!sourceUrl;
 if(sourceUrl) $('sourceLink').href=sourceUrl; else $('sourceLink').removeAttribute('href');
 $('detailDialog').showModal();
}
$('closeDetail').onclick=()=>$('detailDialog').close();$('doneDetail').onclick=()=>$('detailDialog').close();
document.querySelector('.tabs').addEventListener('click',e=>{const b=e.target.closest('[data-type]');if(b){activeType=b.dataset.type;page=1;render()}});
$('rows').addEventListener('change',e=>{if(e.target.dataset.select){e.target.checked?selected.add(e.target.dataset.select):selected.delete(e.target.dataset.select);render()}});
$('rows').addEventListener('click',e=>{const b=e.target.closest('[data-action],[data-more],[data-detail],[data-params]');if(!b)return;const x=departmentItems().find(i=>i.id===(b.dataset.action||b.dataset.more||b.dataset.detail||b.dataset.params));if(b.dataset.params){showParams(x);return}if(b.dataset.more||b.dataset.detail){showItemDetail(x);return}if(x.status==='待处理'||x.status==='失败')dispatch([x.id]);else openAgentTask(x)});
$('demoDepartment').onchange=e=>{demoDepartment=e.target.value;activeType='全部';page=1;selected.clear();render()};
$('prev').onclick=()=>{page--;render()};$('next').onclick=()=>{page++;render()};$('batch').onclick=()=>dispatch([...selected]);$('filterButton').onclick=()=>{$('filterBar').hidden=!$('filterBar').hidden};['statusFilter','priorityFilter'].forEach(id=>$(id).onchange=()=>{page=1;render()});$('resetFilters').onclick=()=>{$('statusFilter').value='全部';$('priorityFilter').value='全部';page=1;render()};$('settingsButton').onclick=()=>toast('当前显示完整待办信息');$('moreButton').onclick=()=>toast('本页面使用本地演示数据');$('agentSpace').onclick=()=>modal('AgentSpace','此入口用于跳转 AgentSpace。当前为离线演示，尚未配置实际地址。',null,'关闭');$('closeDialog').onclick=()=>$('dialog').close();$('cancelDialog').onclick=()=>$('dialog').close();$('confirmDialog').onclick=()=>{if(dialogAction)dialogAction();$('dialog').close()};render();
