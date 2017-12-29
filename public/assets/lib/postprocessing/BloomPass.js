﻿THREE.BloomPass=function(n,t,i,r){var e,u,f;n=n!==undefined?n:1;t=t!==undefined?t:25;i=i!==undefined?i:4;r=r!==undefined?r:256;e={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat};this.renderTargetX=new THREE.WebGLRenderTarget(r,r,e);this.renderTargetY=new THREE.WebGLRenderTarget(r,r,e);THREE.CopyShader===undefined&&console.error("THREE.BloomPass relies on THREE.CopyShader");u=THREE.CopyShader;this.copyUniforms=THREE.UniformsUtils.clone(u.uniforms);this.copyUniforms.opacity.value=n;this.materialCopy=new THREE.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:THREE.AdditiveBlending,transparent:!0});THREE.ConvolutionShader===undefined&&console.error("THREE.BloomPass relies on THREE.ConvolutionShader");f=THREE.ConvolutionShader;this.convolutionUniforms=THREE.UniformsUtils.clone(f.uniforms);this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurx;this.convolutionUniforms.cKernel.value=THREE.ConvolutionShader.buildKernel(i);this.materialConvolution=new THREE.ShaderMaterial({uniforms:this.convolutionUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader,defines:{KERNEL_SIZE_FLOAT:t.toFixed(1),KERNEL_SIZE_INT:t.toFixed(0)}});this.enabled=!0;this.needsSwap=!1;this.clear=!1};THREE.BloomPass.prototype={render:function(n,t,i,r,u){u&&n.context.disable(n.context.STENCIL_TEST);THREE.EffectComposer.quad.material=this.materialConvolution;this.convolutionUniforms.tDiffuse.value=i;this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurX;n.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,this.renderTargetX,!0);this.convolutionUniforms.tDiffuse.value=this.renderTargetX;this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurY;n.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,this.renderTargetY,!0);THREE.EffectComposer.quad.material=this.materialCopy;this.copyUniforms.tDiffuse.value=this.renderTargetY;u&&n.context.enable(n.context.STENCIL_TEST);n.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,i,this.clear)}};THREE.BloomPass.blurX=new THREE.Vector2(.001953125,0);THREE.BloomPass.blurY=new THREE.Vector2(0,.001953125);