const items = [
 {type:'FE',id:'FE-2841',name:'智能编排引擎能力升级',desc:'优化智能编排能力，支持多任务并行与资源调度',status:'执行中',progress:72,agent:'AG-1028',priority:'高'},
 {type:'MR',id:'MR-1028',name:'服务A核心接口变更',desc:'涉及服务A v2 接口定义调整及兼容性评估',status:'待审核',agent:'AG-1019',priority:'中'},
 {type:'DTS',id:'DTS-0841',name:'多团队协作需求',desc:'评审多团队协作流程与信息触达',status:'待处理',priority:'中'},
 {type:'RR',id:'RR-5672',name:'数据链路策略优化',desc:'完善数据分层策略与链路稳定性',status:'待处理',priority:'低'},
 {type:'US',id:'US-3320',name:'用户体验改进建议',desc:'基于用户反馈的导航与操作体验优化',status:'执行中',progress:48,agent:'AG-1030',priority:'高'},
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
function readCookie(name){
 try { const entry=document.cookie.split(';').map(part=>part.trim()).find(part=>part.startsWith(name+'=')); return entry ? decodeURIComponent(entry.slice(name.length+1)) : ''; }
 catch { return ''; }
}
// department 是演示用 Cookie 名，不代表公司现有身份契约。
let demoDepartment='';
function currentDepartment(){return demoDepartment || readCookie('department');}
function renderDepartment(){
 const department=currentDepartment(), sources=departmentSources[department];
 $('departmentName').textContent=department||'未识别';
 $('departmentHint').textContent=demoDepartment?'演示数据':department?'来自 Cookie（演示）':'未读取到 department Cookie';
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
const $=id=>document.getElementById(id), statusClass={'执行中':'running','待审核':'review','已完成':'done','失败':'failed','待处理':''};
function statusHTML(status){return `<span class="status ${statusClass[status]||''}">${status==='已完成'?'✓':status==='待审核'?'◷':status==='失败'?'⊗':'ϟ'} ${status}</span>`}
function filtered(){return departmentItems().filter(x=>(activeType==='全部'||x.type===activeType)&&($('statusFilter').value==='全部'||x.status===$('statusFilter').value)&&($('priorityFilter').value==='全部'||x.priority===$('priorityFilter').value))}
function render(){
 renderDepartment(); document.querySelector('.tabs').innerHTML=Object.entries(countsFor(departmentItems())).map(([type,count])=>`<button class="tab ${type} ${activeType===type?'active':''}" data-type="${type}" aria-pressed="${activeType===type}">${type} ${count}</button>`).join('');
 const list=filtered(), pages=Math.max(1,Math.ceil(list.length/5));page=Math.min(page,pages);
 $('rows').innerHTML=list.slice((page-1)*5,page*5).map(x=>`<div class="row"><input type="checkbox" aria-label="选择 ${x.id}" data-select="${x.id}" ${selected.has(x.id)?'checked':''}><span class="tag ${x.type}">${x.type}</span><div><div class="item-name">${x.id}&nbsp; ${x.name}</div><div class="item-desc">${x.desc}</div><div class="item-source">来源：${departmentSources[currentDepartment()]?.[x.type] || '暂无配置'}${x.plan ? ' · 执行方案：'+x.plan : ''}</div></div><div><div class="status-line">${statusHTML(x.status)} ${x.progress!=null?x.progress+'%':''}</div>${x.progress!=null?`<div class="bar"><span style="width:${x.progress}%"></span></div>`:''}</div><div class="agent-id">${x.agent?x.agent+' ↗':''}</div><button class="row-action ${x.status==='待处理'||x.status==='失败'?'primary':''}" data-action="${x.id}">${x.status==='待处理'?'ϟ&nbsp; 交给 Agent':x.status==='失败'?'重试':x.status==='执行中'?'前往 AgentSpace ↗':'查看结果'}</button><button class="more" data-more="${x.id}" aria-label="${x.id} 更多操作">•••</button></div>`).join('')||'<div class="empty">没有符合条件的待办</div>';
 $('selectedCount').textContent=`已选 ${selected.size} 项`; $('pageInfo').textContent=`${page} / ${pages}`; $('prev').disabled=page===1;$('next').disabled=page===pages;
 const legend=[['执行中',5,'#1856ff'],['待审核',2,'#ff8c16'],['已完成',12,'#36c94e'],['已失败',0,'#f1244b'],['已取消',0,'#999fd0']];$('legend').innerHTML=legend.map(([label,n,color])=>`<li><i style="--color:${color}"></i>${label}<b>${n}</b></li>`).join('');
 const dispatched=departmentItems().filter(x=>x.plan).map(x=>`<div class="activity-row"><div class="activity-name"><span class="bolt">ϟ</span>${x.agent} ・ ${x.id} ${x.name}<span class="activity-plan">${x.plan}</span></div><div class="activity-end">${statusHTML(x.status)} <b>${x.progress}%</b></div></div>`).join('');
 $('activityRows').innerHTML=dispatched+`<div class="activity-row"><div class="activity-name"><span class="bolt">ϟ</span>AG-1028 ・ FE-2841 设计文档修订</div><div class="activity-end">${statusHTML('执行中')} <b>72%</b><div class="bar"><span style="width:60%"></span></div></div></div><div class="activity-row"><div class="activity-name"><span class="bolt">ϟ</span>AG-1029 ・ US-1028 接口实现方案生成</div><div class="activity-end">${statusHTML('已完成')}<span class="activity-time">10 分钟前</span></div></div><div class="activity-row"><div class="activity-name"><span class="bolt">ϟ</span>AG-1030 ・ DTS-0841 测试用例生成</div><div class="activity-end">${statusHTML('待审核')}<span class="activity-time">25 分钟前</span></div></div>`;
}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').classList.remove('show'),3000)}
function modal(title,content,action,confirm='确认'){$('dialogTitle').textContent=title;$('dialogContent').textContent=content;$('confirmDialog').textContent=confirm;dialogAction=action;$('dialog').showModal()}
const usPlans=[
 {id:'design',name:'软件实现设计',desc:'分析需求并生成软件实现设计',target:'软件设计 Workflow',role:'MDE'},
 {id:'code',name:'代码实现',desc:'根据需求与设计完成代码实现',target:'代码实现 Workflow / Agent',role:'SWE'},
 {id:'test-design',name:'测试设计',desc:'分析需求并生成测试方案与测试用例',target:'测试设计 Workflow',role:'TE'},
 {id:'test-execution',name:'测试执行',desc:'执行测试并汇总测试结果',target:'测试执行 Workflow / Agent',role:'TE'}
];
let pendingCandidates=[], selectedPlan=null;
function completeDispatch(candidates, plan){
 candidates.forEach((x,i)=>{const original=items.find(item=>item.id===(x.type==='IR'?x.id.replace(/^IR-/, 'FE-'):x.id))||x;original.status='执行中';original.progress=0;original.agent=`AG-${1040+i}`;original.plan=plan?.name||''});
 render();toast(`已模拟派发 ${candidates.length} 项任务${plan?' · '+plan.name:''}`);
}
function dispatch(ids){
 const candidates=departmentItems().filter(x=>ids.includes(x.id)&&(x.status==='待处理'||x.status==='失败'));
 if(!candidates.length){toast('所选待办中没有可派发的任务');return}
 const needsPlan=currentDepartment()==='MAE-CN产品部'&&candidates.some(x=>x.type==='US');
 if(needsPlan){
  if(candidates.some(x=>x.type!=='US')){toast('所选项目没有共同执行方案，请按类别分别下发');return}
  pendingCandidates=candidates;selectedPlan=null;
  $('planObject').textContent=candidates.length===1?`${candidates[0].id}  ${candidates[0].name}`:'已选择的 US 待办';
  $('planCount').textContent=`${candidates.length} 项`;
  $('planOptions').innerHTML=usPlans.map(p=>`<label class="plan-option"><input type="radio" name="executionPlan" value="${p.id}"><span><strong>${p.name}<span class="plan-role">${p.role} 常用</span></strong><span class="plan-desc">${p.desc}</span><span class="plan-target">${p.target} · 演示</span></span></label>`).join('');
  $('submitPlan').disabled=true;$('planDialog').showModal();return;
 }
 modal('交给 Agent',`将 ${candidates.length} 项待办交给 Agent 执行？这是本地演示，不会连接实际服务。`,()=>completeDispatch(candidates,null),'确认派发');
}
$('planOptions').addEventListener('change',e=>{selectedPlan=usPlans.find(p=>p.id===e.target.value);$('submitPlan').disabled=!selectedPlan});
$('closePlan').onclick=()=>$('planDialog').close();$('cancelPlan').onclick=()=>$('planDialog').close();
$('submitPlan').onclick=()=>{if(!selectedPlan)return;completeDispatch(pendingCandidates,selectedPlan);$('planDialog').close()};

document.querySelector('.tabs').addEventListener('click',e=>{const b=e.target.closest('[data-type]');if(b){activeType=b.dataset.type;page=1;render()}});
$('rows').addEventListener('change',e=>{if(e.target.dataset.select){e.target.checked?selected.add(e.target.dataset.select):selected.delete(e.target.dataset.select);render()}});
$('rows').addEventListener('click',e=>{const b=e.target.closest('[data-action],[data-more]');if(!b)return;const x=departmentItems().find(i=>i.id===(b.dataset.action||b.dataset.more));if(b.dataset.more){modal('待办详情',`${x.id} ${x.name}。优先级：${x.priority}；状态：${x.status}。${x.desc}`,null,'关闭');return}if(x.status==='待处理'||x.status==='失败')dispatch([x.id]);else modal(x.status==='执行中'?'Agent 任务':'任务结果',`${x.agent} · ${x.id} ${x.name}。当前状态：${x.status}${x.progress!=null?'，进度 '+x.progress+'%':''}。此页面为本地演示。`,null,'关闭')});
$('demoDepartment').onchange=e=>{demoDepartment=e.target.value;activeType='全部';page=1;selected.clear();render()};
$('prev').onclick=()=>{page--;render()};$('next').onclick=()=>{page++;render()};$('batch').onclick=()=>dispatch([...selected]);$('filterButton').onclick=()=>{$('filterBar').hidden=!$('filterBar').hidden};['statusFilter','priorityFilter'].forEach(id=>$(id).onchange=()=>{page=1;render()});$('resetFilters').onclick=()=>{$('statusFilter').value='全部';$('priorityFilter').value='全部';page=1;render()};$('settingsButton').onclick=()=>toast('当前显示完整待办信息');$('moreButton').onclick=()=>toast('本页面使用本地演示数据');$('agentSpace').onclick=()=>modal('AgentSpace','此入口用于跳转 AgentSpace。当前为离线演示，尚未配置实际地址。',null,'关闭');$('closeDialog').onclick=()=>$('dialog').close();$('cancelDialog').onclick=()=>$('dialog').close();$('confirmDialog').onclick=()=>{if(dialogAction)dialogAction();$('dialog').close()};render();
