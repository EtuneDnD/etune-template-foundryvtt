const _0x2612b6=_0x55f1;(function(_0x11a034,_0x587623){const _0x3aa0c1=_0x55f1,_0x33dc0c=_0x11a034();while(!![]){try{const _0x5de3c7=-parseInt(_0x3aa0c1(0x1da))/0x1*(parseInt(_0x3aa0c1(0x1ba))/0x2)+parseInt(_0x3aa0c1(0x1d4))/0x3+-parseInt(_0x3aa0c1(0x1f1))/0x4*(parseInt(_0x3aa0c1(0x1cc))/0x5)+parseInt(_0x3aa0c1(0x1d5))/0x6+-parseInt(_0x3aa0c1(0x1cf))/0x7*(-parseInt(_0x3aa0c1(0x1af))/0x8)+parseInt(_0x3aa0c1(0x1c4))/0x9*(-parseInt(_0x3aa0c1(0x1d8))/0xa)+-parseInt(_0x3aa0c1(0x1ef))/0xb*(-parseInt(_0x3aa0c1(0x1d2))/0xc);if(_0x5de3c7===_0x587623)break;else _0x33dc0c['push'](_0x33dc0c['shift']());}catch(_0x164433){_0x33dc0c['push'](_0x33dc0c['shift']());}}}(_0x28a8,0x67492));import{ActorCharactermancerBaseComponent}from'./ActorCharactermancerUtil.js';import{ModalFilterFeatsFvtt}from'./UtilModalFilter.js';function _0x55f1(_0x1ba24c,_0x387bcc){const _0x28a82a=_0x28a8();return _0x55f1=function(_0x55f157,_0x5e6ea8){_0x55f157=_0x55f157-0x1ae;let _0x18f12c=_0x28a82a[_0x55f157];return _0x18f12c;},_0x55f1(_0x1ba24c,_0x387bcc);}import{Charactermancer_AdditionalFeatsSelect}from'./UtilCharactermancerAdditionalFeats.js';class ActorCharactermancerFeat extends ActorCharactermancerBaseComponent{constructor(_0x14d09c){const _0x5297c1=_0x55f1;_0x14d09c=_0x14d09c||{},super(),this[_0x5297c1(0x1f8)]=_0x14d09c[_0x5297c1(0x1b2)],this[_0x5297c1(0x1c9)]=_0x14d09c[_0x5297c1(0x1dd)],this['_parent']=_0x14d09c[_0x5297c1(0x1be)],this['_tabFeats']=_0x14d09c['tabFeats'],this[_0x5297c1(0x1f3)]=new ModalFilterFeatsFvtt({'namespace':_0x5297c1(0x1f7),'isRadio':!![],'allData':this[_0x5297c1(0x1c9)]['feat']}),this['_compAdditionalFeatsMetas']={},this[_0x5297c1(0x1d0)]=![];}get['modalFilterFeats'](){const _0x4ed570=_0x55f1;return this[_0x4ed570(0x1f3)];}async['pLoad'](){const _0x311475=_0x55f1;await this[_0x311475(0x1f3)][_0x311475(0x1bd)]();}[_0x2612b6(0x1e6)](){const _0xa5627e=_0x2612b6,_0x428fde=this[_0xa5627e(0x1d6)][_0xa5627e(0x1ed)][_0xa5627e(0x1b3)]['getFormDataAsi']();if(!_0x428fde[_0xa5627e(0x1ca)]){const _0x5e7d5a=this[_0xa5627e(0x1f4)](),_0x1f5c09=[_0xa5627e(0x1e2),'feat_availableFromRace',_0xa5627e(0x1e3)][_0xa5627e(0x1ec)](_0xb0df42=>({'prop':_0x5e7d5a[_0xb0df42]}));this[_0xa5627e(0x1d3)]('state',_0x1f5c09);return;}const _0x4d9d32={};Object[_0xa5627e(0x1ee)](_0x428fde['feats'])[_0xa5627e(0x1db)](([_0x2b0b3f,_0x2f37b1])=>{const _0x1e78cb=_0xa5627e,_0x1134f5=_0x2f37b1[_0x1e78cb(0x1d1)](Boolean)['length'];switch(_0x2b0b3f){case _0x1e78cb(0x1b7):_0x4d9d32['feat_availableFromAsi']=_0x1134f5?[{'any':_0x1134f5}]:[];break;case _0x1e78cb(0x1de):_0x4d9d32[_0x1e78cb(0x1b6)]=this['_parent'][_0x1e78cb(0x1f0)][_0x1e78cb(0x1e7)]()?.['feats'];break;case _0x1e78cb(0x1fc):_0x4d9d32['feat_availableFromCustom']=_0x1134f5?[{'any':_0x1134f5}]:[];break;default:throw new Error(_0x1e78cb(0x1ae)+_0x2b0b3f+'\x22');}}),this['_parent'][_0xa5627e(0x1e8)][_0xa5627e(0x1d7)](_0xa5627e(0x1b5),_0x4d9d32);try{this[_0xa5627e(0x1d0)]=!![],Object[_0xa5627e(0x1ee)](_0x428fde[_0xa5627e(0x1ca)])[_0xa5627e(0x1db)](([_0x5e1153,_0x473d2a])=>{const _0x223945=_0xa5627e,_0x459b6d=this['_compAdditionalFeatsMetas'][_0x5e1153]?.[_0x223945(0x1c6)];if(!_0x459b6d)return;_0x459b6d[_0x223945(0x1e5)](_0x473d2a);});}finally{this[_0xa5627e(0x1d0)]=![];}}['render'](){const _0x31a6f0=_0x2612b6,_0x2b4007=this['_tabFeats']?.[_0x31a6f0(0x1bf)];if(!_0x2b4007)return;const _0x1a2c2f=$$`<div class="ve-flex-col w-100 h-100 px-1 pt-1 overflow-y-auto ve-grow veapp__bg-foundry"></div>`,_0x1f6995=$$`<div class="ve-flex-col w-100 h-100 px-1 overflow-y-auto ve-grow veapp__bg-foundry"></div>`,_0x37099d=$('<div><i\x20class=\x22ve-muted\x22>No\x20feats\x20are\x20available\x20for\x20your\x20current\x20class/race\x20combination.</i><hr\x20class=\x22hr-1\x22></div>')[_0x31a6f0(0x1e0)](_0x1a2c2f),_0x4c22be=()=>{const _0x208e23=_0x31a6f0,_0x58de72=[_0x208e23(0x1e2),_0x208e23(0x1b6),'feat_availableFromBackground',_0x208e23(0x1e3)]['some'](_0x52e98c=>this['_state'][_0x52e98c]?.[_0x208e23(0x1cd)]);_0x37099d[_0x208e23(0x1fe)](!_0x58de72);};this[_0x31a6f0(0x1f6)](_0x31a6f0(0x1e2),_0x4c22be),this['_addHookBase'](_0x31a6f0(0x1b6),_0x4c22be),this[_0x31a6f0(0x1f6)](_0x31a6f0(0x1cb),_0x4c22be),this[_0x31a6f0(0x1f6)](_0x31a6f0(0x1e3),_0x4c22be),_0x4c22be(),this['_feat_addFeatSection'](_0x1a2c2f,_0x1f6995,_0x31a6f0(0x1e2),_0x31a6f0(0x1b7)),this[_0x31a6f0(0x1eb)](_0x1a2c2f,_0x1f6995,_0x31a6f0(0x1b6),_0x31a6f0(0x1de)),this[_0x31a6f0(0x1eb)](_0x1a2c2f,_0x1f6995,_0x31a6f0(0x1cb),_0x31a6f0(0x1fa)),this[_0x31a6f0(0x1eb)](_0x1a2c2f,_0x1f6995,_0x31a6f0(0x1e3),_0x31a6f0(0x1fc));const _0x4bec8e=$(_0x31a6f0(0x1c1))[_0x31a6f0(0x1c8)](()=>this[_0x31a6f0(0x1d6)][_0x31a6f0(0x1ed)][_0x31a6f0(0x1b3)]['addCustomFeat']());$$`<div class="ve-flex w-100 h-100">
			<div class="ve-flex-col w-100">
				${_0x1a2c2f}
				<div class="mt-2">${_0x4bec8e}</div>
			</div>
			<div class="vr-1"></div>
			${_0x1f6995}
		</div>`['appendTo'](_0x2b4007),this['setAdditionalFeatStateFromStatgen_']();const _0x6037a4=()=>this['_state'][_0x31a6f0(0x1cb)]=this[_0x31a6f0(0x1d6)]['compBackground'][_0x31a6f0(0x1e4)]({'isAllowStub':![]})?.['feats'];this[_0x31a6f0(0x1d6)][_0x31a6f0(0x1bb)][_0x31a6f0(0x1fd)](_0x31a6f0(0x1dc),_0x6037a4),_0x6037a4();}[_0x2612b6(0x1eb)](_0x37cca7,_0x2cf933,_0x4d4541,_0x3d0c76){const _0x33ee7e=_0x2612b6;let _0x57e6f1=null;const _0xab9f6d=()=>{const _0x17c6cd=_0x55f1,_0x41ec88=this['_state'][_0x4d4541];this[_0x17c6cd(0x1d6)][_0x17c6cd(0x1fb)]['unregister'](_0x57e6f1);if(_0x57e6f1)_0x57e6f1['unregisterFeatureSourceTracking']();const _0x3cda98=_0x57e6f1;_0x57e6f1=this[_0x17c6cd(0x1bc)]({'$wrpLeft':_0x37cca7,'$wrpRight':_0x2cf933,'namespace':_0x3d0c76,'available':_0x41ec88,'prevComp':_0x3cda98});};this[_0x33ee7e(0x1f6)](_0x4d4541,_0xab9f6d),_0xab9f6d();}['_feat_renderAdditionalFeats']({$wrpLeft:_0x4d3a63,$wrpRight:_0x23ecde,namespace:_0x4db588,available:_0x51269a,prevComp:prevComp=null}){const _0x4f1ffe=_0x2612b6;if(this[_0x4f1ffe(0x1ce)][_0x4db588])this[_0x4f1ffe(0x1ce)][_0x4db588]['cleanup']();if(!_0x51269a?.[_0x4f1ffe(0x1cd)])return;const _0x27140a=$(_0x4f1ffe(0x1c5))[_0x4f1ffe(0x1e0)](_0x4d3a63),_0x4fff6a=$(_0x4f1ffe(0x1c5))['appendTo'](_0x23ecde),_0x345a66=new Charactermancer_AdditionalFeatsSelect({'available':_0x51269a,'actor':this[_0x4f1ffe(0x1f8)],'featDatas':this[_0x4f1ffe(0x1c9)][_0x4f1ffe(0x1b0)],'modalFilterFeats':this[_0x4f1ffe(0x1f3)],'featureSourceTracker':this['_parent'][_0x4f1ffe(0x1fb)],'isFeatureSelect':!![],'prevComp':prevComp});return this['_feat_renderAdditionalFeats_addStatgenHandling']({'compAdditionalFeats':_0x345a66,'namespace':_0x4db588}),this[_0x4f1ffe(0x1ce)][_0x4db588]={'comp':_0x345a66,'cleanup':()=>{const _0x423c47=_0x4f1ffe;_0x27140a[_0x423c47(0x1b8)](),_0x4fff6a[_0x423c47(0x1b8)]();}},_0x345a66[_0x4f1ffe(0x1df)]({'$wrpLeft':_0x27140a,'$wrpRight':_0x4fff6a}),_0x345a66;}[_0x2612b6(0x1d9)]({compAdditionalFeats:_0x32d6ea,namespace:_0x3ce4e1}){const _0x19b96c=_0x2612b6;if(!ActorCharactermancerFeat[_0x19b96c(0x1c0)][_0x19b96c(0x1b1)](_0x3ce4e1))return;const _0x3d45b6=()=>{const _0x2bab3b=_0x19b96c;if(this['_isSuspendSyncToStatgen'])return;const _0x20650f=_0x32d6ea[_0x2bab3b(0x1c7)](),_0x453b15=_0x32d6ea[_0x2bab3b(0x1f2)];if([_0x2bab3b(0x1de)]['includes'](_0x3ce4e1)){this[_0x2bab3b(0x1d6)][_0x2bab3b(0x1ed)][_0x2bab3b(0x1b3)][_0x2bab3b(0x1e1)](_0x2bab3b(0x1de),_0x453b15);const _0x453a09=_0x20650f[_0x2bab3b(0x1dd)]['filter'](({type:_0x16dd07})=>_0x16dd07==='choose')[_0x2bab3b(0x1ea)](({ix:_0x490360,ixFeat:_0x3dfb34})=>({'ix':_0x490360,'ixFeat':_0x3dfb34}));this[_0x2bab3b(0x1d6)][_0x2bab3b(0x1ed)][_0x2bab3b(0x1b3)][_0x2bab3b(0x1e9)](_0x2bab3b(0x1de),_0x453a09);}else{if([_0x2bab3b(0x1b7)][_0x2bab3b(0x1c3)](_0x3ce4e1)){let _0x52c710=-0x1,_0x44ee36=0x0;(_0x20650f[_0x2bab3b(0x1c2)]||[])[_0x2bab3b(0x1db)](_0x39a7ec=>{const _0x5e7171=_0x2bab3b;_0x39a7ec>_0x52c710+_0x44ee36+0x1&&(_0x44ee36+=_0x39a7ec-(_0x52c710+_0x44ee36+0x1));const _0x592a1c=_0x20650f[_0x5e7171(0x1dd)]['find'](_0x578b3d=>_0x578b3d['ix']+_0x44ee36===_0x39a7ec);this[_0x5e7171(0x1d6)][_0x5e7171(0x1ed)][_0x5e7171(0x1b3)][_0x5e7171(0x1b9)](_0x39a7ec,_0x3ce4e1,_0x592a1c?.[_0x5e7171(0x1ff)]??-0x1),_0x52c710++;});}else[_0x2bab3b(0x1fc)][_0x2bab3b(0x1c3)](_0x3ce4e1)&&_0x20650f[_0x2bab3b(0x1dd)][_0x2bab3b(0x1db)](_0x459b3f=>{const _0x3499d4=_0x2bab3b;this[_0x3499d4(0x1d6)][_0x3499d4(0x1ed)][_0x3499d4(0x1b3)][_0x3499d4(0x1b9)](_0x459b3f['ix'],_0x3ce4e1,_0x459b3f['ixFeat']);});}};_0x32d6ea[_0x19b96c(0x1f5)](_0x3d45b6),_0x3d45b6();}async['feat_pGetAdditionalFeatFormData'](){const _0x497bdc=_0x2612b6,_0x3e589b={'ability':null,'race':null,'background':null,'custom':null,'isAnyData':![]};for(const _0x4cad69 of[_0x497bdc(0x1b7),'race',_0x497bdc(0x1fa),_0x497bdc(0x1fc)]){if(!this['_compAdditionalFeatsMetas'][_0x4cad69])continue;const {comp:_0x427542}=this[_0x497bdc(0x1ce)][_0x4cad69];_0x3e589b[_0x4cad69]=await _0x427542[_0x497bdc(0x1f9)](),_0x3e589b[_0x497bdc(0x1b4)]=!![];}return _0x3e589b;}['_getDefaultState'](){return{'feat_availableFromAsi':[],'feat_availableFromRace':null,'feat_availableFromBackground':null,'feat_availableFromCustom':[],'feat_pulseChange':![]};}}ActorCharactermancerFeat['_NAMESPACES_STATGEN']=new Set([_0x2612b6(0x1b7),'race',_0x2612b6(0x1fc)]);function _0x28a8(){const _0x1d29cc=['85236UDaEvU','_proxyAssignSimple','1939476GAZzoH','3673362JqKoTu','_parent','proxyAssignSimple','7273090MdKmZE','_feat_renderAdditionalFeats_addStatgenHandling','2yGtgNs','forEach','background_pulseBackground','data','race','renderTwoColumn','appendTo','setIxFeatSet','feat_availableFromAsi','feat_availableFromCustom','getFeatureCustomizedBackground_','setStateFromStatgenFeatList_','setAdditionalFeatStateFromStatgen_','getRace_','compFeat','setIxFeatSetIxFeats','map','_feat_addFeatSection','mergeMap','compAbility','entries','341lbUMiN','compRace','3680mJJtye','ixSetAvailable','_modalFilterFeats','_getDefaultState','addHookPulseFeats','_addHookBase','ActorCharactermancer.feats','_actor','pGetFormData','background','featureSourceTracker_','custom','addHookBase','toggleVe','ixFeat','Unhandled\x20feat\x20namespace\x20\x22','11432caGFiy','feat','has','actor','compStatgen','isAnyData','state','feat_availableFromRace','ability','remove','setIxFeat','264236aTMRoJ','compBackground','_feat_renderAdditionalFeats','pPreloadHidden','parent','$wrpTab','_NAMESPACES_STATGEN','<button\x20class=\x22btn\x20btn-5et\x20btn-sm\x22>Add\x20Feat</button>','ixsStatgen','includes','9WPkWOE','<div\x20class=\x22ve-flex-col\x20w-100\x22></div>','comp','getFormDataReduced','click','_data','feats','feat_availableFromBackground','1895PHUUDe','length','_compAdditionalFeatsMetas','1393qfmldI','_isSuspendSyncToStatgen','filter'];_0x28a8=function(){return _0x1d29cc;};return _0x28a8();}export{ActorCharactermancerFeat};