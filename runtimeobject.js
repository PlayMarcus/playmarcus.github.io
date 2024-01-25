var gdjs;(function(n){const _=(A,e,t,i)=>{const s=Math.max(t,A-t),r=Math.max(i,e-i);return Math.pow(s,2)+Math.pow(r,2)},x={moveXArray:[],moveYArray:[]},F={result:n.Polygon.makeNewRaycastTestResult()},D=(A,e,t)=>{if(e.length===0)return e.length=0,t.length=0,!1;if(e.length===1)return A.setPosition(A.getX()+e[0],A.getY()+t[0]),e.length=0,t.length=0,!0;let i=0,s=0;for(let b=0;b<e.length;b++){const C=e[b],f=t[b],y=C*C+f*f;y>i&&(i=y,s=b)}const r=Math.sqrt(i),a=e[s]/r,h=-(t[s]/r),c=a;let d=0,g=0;for(let b=0;b<e.length;b++){const C=e[b],f=t[b],y=C*h+f*c;d=Math.min(d,y),g=Math.max(g,y)}let u=e[s],B=t[s];const v=-d<g/1048576,p=g<-d/1048576;return v!==p&&(p?(u+=d*h,B+=d*c):(u+=g*h,B+=g*c)),A.setPosition(A.getX()+u,A.getY()+B),e.length=0,t.length=0,!0},o=class{constructor(e,t){this.x=0;this.y=0;this.angle=0;this.zOrder=0;this.hidden=!1;this.layer="";this._livingOnScene=!0;this.destroyCallbacks=new Set;this.persistentUuid=null;this.pick=!1;this._defaultHitBoxes=[];this.hitBoxesDirty=!0;this.aabb={min:[0,0],max:[0,0]};this._isIncludedInParentCollisionMask=!0;this._rendererEffects={};this._instantForces=[];this._permanentForceX=0;this._permanentForceY=0;this._behaviors=[];this.getVariableNumber=o.getVariableNumber;this.returnVariable=o.returnVariable;this.getVariableString=o.getVariableString;this.setVariableNumber=o.setVariableNumber;this.setVariableString=o.setVariableString;this.getVariableBoolean=o.getVariableBoolean;this.setVariableBoolean=o.setVariableBoolean;this.getVariableChildCount=o.getVariableChildCount;this.getFirstVariableNumber=o.getFirstVariableNumber;this.getFirstVariableString=o.getFirstVariableString;this.getLastVariableNumber=o.getLastVariableNumber;this.getLastVariableString=o.getLastVariableString;this.toggleVariableBoolean=o.toggleVariableBoolean;this.variableChildExists=o.variableChildExists;this.variableRemoveChild=o.variableRemoveChild;this.variableClearChildren=o.variableClearChildren;this.variablePushCopy=o.variablePushCopy;this.valuePush=o.valuePush;this.variableRemoveAt=o.variableRemoveAt;this.getSqDistanceTo=o.prototype.getSqDistanceToPosition;this.name=t.name||"",this.type=t.type||"",this._nameId=o.getNameIdentifier(this.name),this.id=e.getScene().createNewUniqueId(),this._runtimeScene=e,this._defaultHitBoxes.push(n.Polygon.createRectangle(0,0)),this.hitBoxes=this._defaultHitBoxes,this._variables=new n.VariablesContainer(t?t.variables:void 0),this._totalForce=new n.Force(0,0,0),this._behaviorsTable=new Hashtable;for(let i=0;i<t.effects.length;++i)this._runtimeScene.getGame().getEffectsManager().initializeEffect(t.effects[i],this._rendererEffects,this),this.updateAllEffectParameters(t.effects[i]);for(let i=0,s=t.behaviors.length;i<s;++i){const r=t.behaviors[i],a=n.getBehaviorConstructor(r.type),l=new a(e,r,this);l.usesLifecycleFunction()&&this._behaviors.push(l),this._behaviorsTable.put(r.name,l)}this._timers=new Hashtable}onCreated(){if(this.getRendererObject())for(const t in this._rendererEffects)this._rendererEffects[t].applyEffect(this);for(let t=0;t<this._behaviors.length;++t)this._behaviors[t].onCreated()}reinitialize(e){const t=this._runtimeScene;this.x=0,this.y=0,this.angle=0,this.zOrder=0,this.hidden=!1,this.layer="",this._livingOnScene=!0,this.id=t.createNewUniqueId(),this.persistentUuid=null,this.pick=!1,this.hitBoxesDirty=!0,this._defaultHitBoxes.length=0,this._defaultHitBoxes.push(n.Polygon.createRectangle(0,0)),this.aabb.min[0]=0,this.aabb.min[1]=0,this.aabb.max[0]=0,this.aabb.max[1]=0,this._variables=new n.VariablesContainer(e.variables),this.clearForces(),this._behaviorsTable.clear();const i=e.behaviors.length;let s=0;for(let r=0;r<i;++r){const a=e.behaviors[r],l=n.getBehaviorConstructor(a.type),h=new l(t,a,this);h.usesLifecycleFunction()&&(s<this._behaviors.length?this._behaviors[s]=h:this._behaviors.push(h),s++),this._behaviorsTable.put(a.name,h)}this._behaviors.length=s;for(let r=0;r<e.effects.length;++r)this._runtimeScene.getGame().getEffectsManager().initializeEffect(e.effects[r],this._rendererEffects,this),this.updateAllEffectParameters(e.effects[r]);this._timers.clear(),this.destroyCallbacks.clear(),this.invalidateHitboxes()}getElapsedTime(e){return this._runtimeScene.getLayer(this.layer).getElapsedTime()}getParent(){return this._runtimeScene}getRuntimeScene(){return this._runtimeScene.getScene()}getInstanceContainer(){return this._runtimeScene}update(e){}updatePreRender(e){}extraInitializationFromInitialInstance(e){}updateFromObjectData(e,t){return!1}deleteFromScene(e){this._livingOnScene&&(e.markObjectForDeletion(this),this._livingOnScene=!1)}registerDestroyCallback(e){this.destroyCallbacks.add(e)}unregisterDestroyCallback(e){this.destroyCallbacks.delete(e)}onDeletedFromScene(e){const t=e.getLayer(this.layer),i=this.getRendererObject();i&&t.getRenderer().removeRendererObject(i);const s=this.get3DRendererObject();s&&t.getRenderer().remove3DRendererObject(s);for(let r=0,a=this._behaviors.length;r<a;++r)this._behaviors[r].onDestroy();this.destroyCallbacks.forEach(r=>r()),this.clearEffects()}onDestroyed(){}onScenePaused(e){}onSceneResumed(e){}getRendererObject(){}get3DRendererObject(){}getName(){return this.name}getNameId(){return this._nameId}getUniqueId(){return this.id}setPosition(e,t){this.setX(e),this.setY(t)}setX(e){e!==this.x&&(this.x=e,this.invalidateHitboxes())}invalidateHitboxes(){this.hitBoxesDirty=!0,this._runtimeScene.onChildrenLocationChanged()}getX(){return this.x}setY(e){e!==this.y&&(this.y=e,this.invalidateHitboxes())}getY(){return this.y}getDrawableX(){return this.getX()}getDrawableY(){return this.getY()}rotateTowardPosition(e,t,i,s){this.rotateTowardAngle(n.toDegrees(Math.atan2(t-(this.getDrawableY()+this.getCenterY()),e-(this.getDrawableX()+this.getCenterX()))),i,s)}rotateTowardAngle(e,t,i){if(t===0){this.setAngle(e);return}const r=n.evtTools.common.angleDifference(this.getAngle(),e)>=0;let a=this.getAngle()+(r?-1:1)*t*this.getElapsedTime()/1e3;n.evtTools.common.angleDifference(a,e)>0^r&&(a=e),this.setAngle(a),this.getAngle()!==a&&this.setAngle(e)}rotate(e,t){this.setAngle(this.getAngle()+e*this.getElapsedTime()/1e3)}setAngle(e){this.angle!==e&&(this.angle=e,this.invalidateHitboxes())}getAngle(){return this.angle}setLayer(e){if(e===this.layer)return;const t=this._runtimeScene.getLayer(this.layer);this.layer=e;const i=this._runtimeScene.getLayer(this.layer),s=this.getRendererObject();s&&(t.getRenderer().removeRendererObject(s),i.getRenderer().addRendererObject(s,this.zOrder));const r=this.get3DRendererObject();r&&(t.getRenderer().remove3DRendererObject(r),i.getRenderer().add3DRendererObject(r))}getLayer(){return this.layer}isOnLayer(e){return this.layer===e}setZOrder(e){if(e===this.zOrder)return;this.zOrder=e;const t=this.getRendererObject();t&&this._runtimeScene.getLayer(this.layer).getRenderer().changeRendererObjectZOrder(t,e)}getZOrder(){return this.zOrder}getVariables(){return this._variables}static getVariableNumber(e){return e.getAsNumber()}static returnVariable(e){return e}static getVariableString(e){return e.getAsString()}static getVariableChildCount(e){return e.getChildrenCount()}static setVariableNumber(e,t){e.setNumber(t)}static setVariableString(e,t){e.setString(t)}static variableChildExists(e,t){return e.hasChild(t)}static variableRemoveChild(e,t){e.removeChild(t)}static variableClearChildren(e){e.clearChildren()}hasVariable(e){return this._variables.has(e)}getRendererEffects(){return this._rendererEffects}addEffect(e){return this.getRendererObject()?this._runtimeScene.getGame().getEffectsManager().addEffect(e,this._rendererEffects,this):!1}removeEffect(e){return this.getRendererObject()?this._runtimeScene.getGame().getEffectsManager().removeEffect(this._rendererEffects,this,e):!1}clearEffects(){const e=this.getRendererObject();return e?(this._rendererEffects={},this._runtimeScene.getGame().getEffectsManager().clearEffects(e)):!1}setEffectDoubleParameter(e,t,i){return this._runtimeScene.getGame().getEffectsManager().setEffectDoubleParameter(this._rendererEffects,e,t,i)}setEffectStringParameter(e,t,i){return this._runtimeScene.getGame().getEffectsManager().setEffectStringParameter(this._rendererEffects,e,t,i)}setEffectBooleanParameter(e,t,i){return this._runtimeScene.getGame().getEffectsManager().setEffectBooleanParameter(this._rendererEffects,e,t,i)}updateAllEffectParameters(e){return this._runtimeScene.getGame().getEffectsManager().updateAllEffectParameters(this._rendererEffects,e)}enableEffect(e,t){this._runtimeScene.getGame().getEffectsManager().enableEffect(this._rendererEffects,this,e,t)}isEffectEnabled(e){return this._runtimeScene.getGame().getEffectsManager().isEffectEnabled(this._rendererEffects,this,e)}hasEffect(e){return this._runtimeScene.getGame().getEffectsManager().hasEffect(this._rendererEffects,e)}hide(e){e===void 0&&(e=!0),this.hidden=e}isVisible(){return!this.hidden}isHidden(){return this.hidden}setWidth(e){}setHeight(e){}getWidth(){return 0}getHeight(){return 0}getCenterX(){return this.getWidth()/2}getCenterY(){return this.getHeight()/2}getCenterXInScene(){return this.getDrawableX()+this.getCenterX()}getCenterYInScene(){return this.getDrawableY()+this.getCenterY()}setCenterPositionInScene(e,t){this.setX(e+this.x-(this.getDrawableX()+this.getCenterX())),this.setY(t+this.y-(this.getDrawableY()+this.getCenterY()))}setCenterXInScene(e){this.setX(e+this.x-(this.getDrawableX()+this.getCenterX()))}setCenterYInScene(e){this.setY(e+this.y-(this.getDrawableY()+this.getCenterY()))}_getRecycledForce(e,t,i){if(o.forcesGarbage.length===0)return new n.Force(e,t,i);{const s=o.forcesGarbage.pop();return s.setX(e),s.setY(t),s.setMultiplier(i),s}}addForce(e,t,i){i===1?(this._permanentForceX+=e,this._permanentForceY+=t):i===0&&this._instantForces.length>0&&this._instantForces[0].getMultiplier()===0?this._instantForces[0].add(e,t):this._instantForces.push(this._getRecycledForce(e,t,i))}addPolarForce(e,t,i){const s=n.toRad(e),r=Math.cos(s)*t,a=Math.sin(s)*t;this.addForce(r,a,i)}addForceTowardPosition(e,t,i,s){const r=Math.atan2(t-(this.getDrawableY()+this.getCenterY()),e-(this.getDrawableX()+this.getCenterX())),a=Math.cos(r)*i,l=Math.sin(r)*i;this.addForce(a,l,s)}addForceTowardObject(e,t,i){e!=null&&this.addForceTowardPosition(e.getDrawableX()+e.getCenterX(),e.getDrawableY()+e.getCenterY(),t,i)}clearForces(){o.forcesGarbage.push.apply(o.forcesGarbage,this._instantForces),this._instantForces.length=0,this._permanentForceX=0,this._permanentForceY=0}hasNoForces(){return this._instantForces.length===0&&this._permanentForceX===0&&this._permanentForceY===0}updateForces(e){for(let t=0;t<this._instantForces.length;){const i=this._instantForces[t],s=i.getMultiplier();s===1?++t:s===0||i.getLength()<=.001?(o.forcesGarbage.push(i),this._instantForces.splice(t,1)):(i.setLength(i.getLength()-i.getLength()*(1-s)*e),++t)}}getAverageForce(){this._totalForce.clear(),this._totalForce.add(this._permanentForceX,this._permanentForceY);for(let e=0,t=this._instantForces.length;e<t;++e)this._totalForce.addForce(this._instantForces[e]);return this._totalForce}averageForceAngleIs(e,t){let i=this.getAverageForce().getAngle();return i<0&&(i+=360),Math.abs(e-i)<t/2}isTotalForceAngleAround(e,t){return Math.abs(n.evtTools.common.angleDifference(this.getAverageForce().getAngle(),e))<=t}getHitBoxes(){return this.hitBoxesDirty&&(this.updateHitBoxes(),this.updateAABB(),this.hitBoxesDirty=!1),this.hitBoxes}getHitBoxesAround(e,t,i,s){return this.getHitBoxes()}updateHitBoxes(){this.hitBoxes=this._defaultHitBoxes;const e=this.getWidth(),t=this.getHeight(),i=this.getCenterX(),s=this.getCenterY();i===e/2&&s===t/2?(this.hitBoxes[0].vertices[0][0]=-i,this.hitBoxes[0].vertices[0][1]=-s,this.hitBoxes[0].vertices[1][0]=+i,this.hitBoxes[0].vertices[1][1]=-s,this.hitBoxes[0].vertices[2][0]=+i,this.hitBoxes[0].vertices[2][1]=+s,this.hitBoxes[0].vertices[3][0]=-i,this.hitBoxes[0].vertices[3][1]=+s):(this.hitBoxes[0].vertices[0][0]=0-i,this.hitBoxes[0].vertices[0][1]=0-s,this.hitBoxes[0].vertices[1][0]=e-i,this.hitBoxes[0].vertices[1][1]=0-s,this.hitBoxes[0].vertices[2][0]=e-i,this.hitBoxes[0].vertices[2][1]=t-s,this.hitBoxes[0].vertices[3][0]=0-i,this.hitBoxes[0].vertices[3][1]=t-s),this.hitBoxes[0].rotate(n.toRad(this.getAngle())),this.hitBoxes[0].move(this.getDrawableX()+i,this.getDrawableY()+s)}isIncludedInParentCollisionMask(){return this._isIncludedInParentCollisionMask}setIncludedInParentCollisionMask(e){const t=this._isIncludedInParentCollisionMask;this._isIncludedInParentCollisionMask=e,t!==e&&this._runtimeScene.onChildrenLocationChanged()}getAABB(){return this.hitBoxesDirty&&(this.updateHitBoxes(),this.updateAABB(),this.hitBoxesDirty=!1),this.aabb}getVisibilityAABB(){return this.getAABB()}updateAABB(){if(this.getAngle()===0)this.aabb.min[0]=this.getDrawableX(),this.aabb.min[1]=this.getDrawableY(),this.aabb.max[0]=this.aabb.min[0]+this.getWidth(),this.aabb.max[1]=this.aabb.min[1]+this.getHeight();else{let e=!0;for(let t=0;t<this.hitBoxes.length;t++)for(let i=0;i<this.hitBoxes[t].vertices.length;i++){const s=this.hitBoxes[t].vertices[i];e?(this.aabb.min[0]=s[0],this.aabb.max[0]=s[0],this.aabb.min[1]=s[1],this.aabb.max[1]=s[1],e=!1):(this.aabb.min[0]=Math.min(this.aabb.min[0],s[0]),this.aabb.max[0]=Math.max(this.aabb.max[0],s[0]),this.aabb.min[1]=Math.min(this.aabb.min[1],s[1]),this.aabb.max[1]=Math.max(this.aabb.max[1],s[1]))}}}getAABBLeft(){return this.getAABB().min[0]}getAABBTop(){return this.getAABB().min[1]}getAABBRight(){return this.getAABB().max[0]}getAABBBottom(){return this.getAABB().max[1]}getAABBCenterX(){return this.getAABB().min[0]/2+this.getAABB().max[0]/2}getAABBCenterY(){return this.getAABB().min[1]/2+this.getAABB().max[1]/2}stepBehaviorsPreEvents(e){for(let t=0,i=this._behaviors.length;t<i;++t)this._behaviors[t].stepPreEvents(e)}stepBehaviorsPostEvents(e){for(let t=0,i=this._behaviors.length;t<i;++t)this._behaviors[t].stepPostEvents(e)}notifyBehaviorsObjectHotReloaded(){for(let e=0,t=this._behaviors.length;e<t;++e)this._behaviors[e].onObjectHotReloaded()}getBehavior(e){return this._behaviorsTable.get(e)}hasBehavior(e){return this._behaviorsTable.containsKey(e)}activateBehavior(e,t){this._behaviorsTable.containsKey(e)&&this._behaviorsTable.get(e).activate(t)}behaviorActivated(e){return this._behaviorsTable.containsKey(e)?this._behaviorsTable.get(e).activated():!1}removeBehavior(e){const t=this._behaviorsTable.get(e);if(!t)return!1;t.onDestroy();const i=this._behaviors.indexOf(t);return i!==-1&&this._behaviors.splice(i,1),this._behaviorsTable.remove(e),!0}addNewBehavior(e){const t=n.getBehaviorConstructor(e.type);if(!t)return!1;const i=new t(this._runtimeScene,e,this);return i.usesLifecycleFunction()&&this._behaviors.push(i),this._behaviorsTable.put(e.name,i),!0}updateTimers(e){for(const t in this._timers.items)this._timers.items.hasOwnProperty(t)&&this._timers.items[t].updateTime(e)}timerElapsedTime(e,t){return this._timers.containsKey(e)?this.getTimerElapsedTimeInSeconds(e)>=t:(this._timers.put(e,new n.Timer(e)),!1)}timerPaused(e){return this._timers.containsKey(e)?this._timers.get(e).isPaused():!1}resetTimer(e){this._timers.containsKey(e)||this._timers.put(e,new n.Timer(e)),this._timers.get(e).reset()}pauseTimer(e){this._timers.containsKey(e)||this._timers.put(e,new n.Timer(e)),this._timers.get(e).setPaused(!0)}unpauseTimer(e){this._timers.containsKey(e)||this._timers.put(e,new n.Timer(e)),this._timers.get(e).setPaused(!1)}removeTimer(e){this._timers.containsKey(e)&&this._timers.remove(e)}getTimerElapsedTimeInSeconds(e){return this._timers.containsKey(e)?this._timers.get(e).getTime()/1e3:0}getTimerElapsedTimeInSecondsOrNaN(e){return this._timers.containsKey(e)?this._timers.get(e).getTime()/1e3:Number.NaN}separateFromObjects(e,t){let i=x.moveXArray,s=x.moveYArray;i.length=0,s.length=0;const r=this.getHitBoxes();let a=null;for(const l of e){if(l.id===this.id)continue;let h=l.getHitBoxes(),c=h;h.length>4&&(a||(a=this.getAABB()),c=l.getHitBoxesAround(a.min[0],a.min[1],a.max[0],a.max[1]));for(const d of r)for(const g of c){const u=n.Polygon.collisionTest(d,g,t);u.collision&&(i.push(u.move_axis[0]),s.push(u.move_axis[1]))}}return D(this,i,s)}separateFromObjectsList(e,t){let i=x.moveXArray,s=x.moveYArray;i.length=0,s.length=0;const r=this.getHitBoxes();let a=null;for(const l in e.items)if(e.items.hasOwnProperty(l)){const h=e.items[l];for(const c of h){if(c.id===this.id)continue;let d=c.getHitBoxes(),g=d;d.length>4&&(a||(a=this.getAABB()),g=c.getHitBoxesAround(a.min[0],a.min[1],a.max[0],a.max[1]));for(const u of r)for(const B of g){const v=n.Polygon.collisionTest(u,B,t);v.collision&&(i.push(v.move_axis[0]),s.push(v.move_axis[1]))}}}return D(this,i,s)}getDistanceToObject(e){return Math.sqrt(this.getSqDistanceToObject(e))}getSqDistanceToObject(e){if(e===null)return 0;const t=this.getDrawableX()+this.getCenterX()-(e.getDrawableX()+e.getCenterX()),i=this.getDrawableY()+this.getCenterY()-(e.getDrawableY()+e.getCenterY());return t*t+i*i}getDistanceToPosition(e,t){return Math.sqrt(this.getSqDistanceToPosition(e,t))}getSqDistanceToPosition(e,t){const i=this.getDrawableX()+this.getCenterX()-e,s=this.getDrawableY()+this.getCenterY()-t;return i*i+s*s}getAngleToObject(e){if(e===null)return 0;const t=this.getDrawableX()+this.getCenterX()-(e.getDrawableX()+e.getCenterX()),i=this.getDrawableY()+this.getCenterY()-(e.getDrawableY()+e.getCenterY());return n.toDegrees(Math.atan2(-i,-t))}getXFromAngleAndDistance(e,t){return this.getDrawableX()+this.getCenterX()+t*Math.cos(n.toRad(e))}getYFromAngleAndDistance(e,t){return this.getDrawableY()+this.getCenterY()+t*Math.sin(n.toRad(e))}getAngleToPosition(e,t){const i=this.getDrawableX()+this.getCenterX()-e,s=this.getDrawableY()+this.getCenterY()-t;return n.toDegrees(Math.atan2(-s,-i))}putAround(e,t,i,s){const r=n.toRad(s);this.setCenterXInScene(e+Math.cos(r)*i),this.setCenterYInScene(t+Math.sin(r)*i)}putAroundObject(e,t,i){!e||this.putAround(e.getDrawableX()+e.getCenterX(),e.getDrawableY()+e.getCenterY(),t,i)}separateObjectsWithoutForces(e){const t=n.staticArray(o.prototype.separateObjectsWithoutForces);t.length=0;const i=n.staticArray2(o.prototype.separateObjectsWithoutForces);e.values(i);for(let s=0,r=i.length;s<r;++s)t.push.apply(t,i[s]);for(let s=0,r=t.length;s<r;++s)t[s].id!=this.id&&(this.getDrawableX()<t[s].getDrawableX()?this.setX(t[s].getDrawableX()-this.getWidth()):this.getDrawableX()+this.getWidth()>t[s].getDrawableX()+t[s].getWidth()&&this.setX(t[s].getDrawableX()+t[s].getWidth()),this.getDrawableY()<t[s].getDrawableY()?this.setY(t[s].getDrawableY()-this.getHeight()):this.getDrawableY()+this.getHeight()>t[s].getDrawableY()+t[s].getHeight()&&this.setY(t[s].getDrawableY()+t[s].getHeight()))}separateObjectsWithForces(e){const t=n.staticArray(o.prototype.separateObjectsWithForces);t.length=0;const i=n.staticArray2(o.prototype.separateObjectsWithForces);e.values(i);for(let s=0,r=i.length;s<r;++s)t.push.apply(t,i[s]);for(let s=0,r=t.length;s<r;++s)if(t[s].id!=this.id){if(this.getDrawableX()+this.getCenterX()<t[s].getDrawableX()+t[s].getCenterX()){let a=this.hasNoForces()?0:this.getAverageForce().getX();this.addForce(-a-10,0,0)}else{let a=this.hasNoForces()?0:this.getAverageForce().getX();this.addForce(-a+10,0,0)}if(this.getDrawableY()+this.getCenterY()<t[s].getDrawableY()+t[s].getCenterY()){let a=this.hasNoForces()?0:this.getAverageForce().getY();this.addForce(0,-a-10,0)}else{let a=this.hasNoForces()?0:this.getAverageForce().getY();this.addForce(0,-a+10,0)}}}static collisionTest(e,t,i){const s=e.getCenterX(),r=e.getCenterY(),a=Math.sqrt(_(e.getWidth(),e.getHeight(),s,r)),l=t.getCenterX(),h=t.getCenterY(),c=Math.sqrt(_(t.getWidth(),t.getHeight(),l,h)),d=e.getDrawableX()+s,g=e.getDrawableY()+r,u=t.getDrawableX()+l,B=t.getDrawableY()+h,v=d-u,p=g-B;if(Math.sqrt(v*v+p*p)>a+c)return!1;const b=e.getHitBoxesAround(u-c,B-c,u+c,B+c),C=t.getHitBoxesAround(d-a,g-a,d+a,g+a);for(const f of b)for(const y of C)if(n.Polygon.collisionTest(f,y,i).collision)return!0;return!1}raycastTest(e,t,i,s,r){const a=this.getCenterX(),l=this.getCenterY(),h=_(this.getWidth(),this.getHeight(),a,l),c=(e+i)/2,d=(t+s)/2,g=(i-e)*(i-e)+(s-t)*(s-t),u=this.getDrawableX()+a-c,B=this.getDrawableY()+l-d;let v=F.result;if(v.collision=!1,u*u+B*B>h+g+2*Math.sqrt(g*h))return v;if(r){let p=Number.MAX_VALUE;const b=this.getHitBoxesAround(e,t,i,s);for(const C of b){const f=n.Polygon.raycastTest(C,e,t,i,s);f.collision&&f.closeSqDist<p&&(p=f.closeSqDist,n.Polygon.copyRaycastTestResult(f,v))}}else{let p=-Number.MAX_VALUE;const b=this.getHitBoxesAround(e,t,i,s);for(const C of b){const f=n.Polygon.raycastTest(C,e,t,i,s);f.collision&&f.farSqDist>p&&f.farSqDist<=g&&(p=f.farSqDist,n.Polygon.copyRaycastTestResult(f,v))}}return v}insideObject(e,t){return this.hitBoxesDirty&&(this.updateHitBoxes(),this.updateAABB(),this.hitBoxesDirty=!1),this.aabb.min[0]<=e&&this.aabb.max[0]>=e&&this.aabb.min[1]<=t&&this.aabb.max[1]>=t}static distanceTest(e,t,i){return e.getSqDistanceToObject(t)<=i}cursorOnObject(e){const t=n.staticArray(o.prototype.cursorOnObject);t.length=2;const i=e.getGame().getInputManager(),s=e.getLayer(this.layer),r=s.convertCoords(i.getCursorX(),i.getCursorY(),0,t);if(this.insideObject(r[0],r[1]))return!0;const a=i.getAllTouchIdentifiers();for(let l=0;l<a.length;++l){const h=s.convertCoords(i.getTouchX(a[l]),i.getTouchY(a[l]),0,t);if(this.insideObject(h[0],h[1]))return!0}return!1}isCollidingWithPoint(e,t){const i=this.getHitBoxesAround(e,t,e,t);for(const s of i)if(n.Polygon.isPointInside(s,e,t))return!0;return!1}static getNameIdentifier(e){if(o._identifiers.containsKey(e))return o._identifiers.get(e);o._newId=(o._newId||0)+1;const t=o._newId;return o._identifiers.put(e,t),t}};let m=o;m.supportsReinitialization=!1,m.setVariableBoolean=function(e,t){e.setBoolean(t)},m.getVariableBoolean=function(e,t){return n.evtTools.common.getVariableBoolean(e,t)},m.toggleVariableBoolean=function(e){n.evtTools.common.toggleVariableBoolean(e)},m.variablePushCopy=function(e,t){e.pushVariableCopy(t)},m.valuePush=function(e,t){e.pushValue(t)},m.variableRemoveAt=function(e,t){e.removeAtIndex(t)},m.getFirstVariableString=function(e){return e.getChildrenCount()===0?"":e.getAllChildrenArray()[0].getAsString()},m.getFirstVariableNumber=function(e){return e.getChildrenCount()===0?0:e.getAllChildrenArray()[0].getAsNumber()},m.getLastVariableString=function(e){const t=e.getAllChildrenArray();return t.length===0?"":t[t.length-1].getAsString()},m.getLastVariableNumber=function(e){const t=e.getAllChildrenArray();return t.length===0?0:t[t.length-1].getAsNumber()},m._identifiers=new Hashtable,m._newId=0,m.forcesGarbage=[],n.RuntimeObject=m,n.registerObject("",n.RuntimeObject)})(gdjs||(gdjs={}));
//# sourceMappingURL=runtimeobject.js.map
