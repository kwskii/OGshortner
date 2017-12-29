﻿THREE.ConvolutionShader={defines:{KERNEL_SIZE_FLOAT:"25.0",KERNEL_SIZE_INT:"25"},uniforms:{tDiffuse:{type:"t",value:null},uImageIncrement:{type:"v2",value:new THREE.Vector2(.001953125,0)},cKernel:{type:"fv1",value:[]}},vertexShader:"uniform vec2 uImageIncrement;\nvarying vec2 vUv;\nvoid main() {\nvUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform float cKernel[ KERNEL_SIZE_INT ];\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nvarying vec2 vUv;\nvoid main() {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}",buildKernel:function(n){function o(n,t){return Math.exp(-(n*n)/(2*t*t))}var t,r,u,f,e=25,i=2*Math.ceil(n*3)+1;for(i>e&&(i=e),f=(i-1)*.5,r=new Array(i),u=0,t=0;t<i;++t)r[t]=o(t-f,n),u+=r[t];for(t=0;t<i;++t)r[t]/=u;return r}};