﻿THREE.RenderPass=function(n,t,i,r,u){this.scene=n;this.camera=t;this.overrideMaterial=i;this.clearColor=r;this.clearAlpha=u!==undefined?u:1;this.oldClearColor=new THREE.Color;this.oldClearAlpha=1;this.enabled=!0;this.clear=!0;this.needsSwap=!1};THREE.RenderPass.prototype={render:function(n,t,i){this.scene.overrideMaterial=this.overrideMaterial;this.clearColor&&(this.oldClearColor.copy(n.getClearColor()),this.oldClearAlpha=n.getClearAlpha(),n.setClearColor(this.clearColor,this.clearAlpha));n.render(this.scene,this.camera,i,this.clear);this.clearColor&&n.setClearColor(this.oldClearColor,this.oldClearAlpha);this.scene.overrideMaterial=null}};