"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8346],{18346:(e,r,t)=>{t.r(r),t.d(r,{default:()=>n});var i=t(37876),o=t(14232);function n({SIM_RESOLUTION:e=128,DYE_RESOLUTION:r=1440,CAPTURE_RESOLUTION:t=512,DENSITY_DISSIPATION:n=3.5,VELOCITY_DISSIPATION:u=2,PRESSURE:a=.1,PRESSURE_ITERATIONS:l=20,CURL:c=3,SPLAT_RADIUS:f=.2,SPLAT_FORCE:v=6e3,SHADING:s=!0,COLOR_UPDATE_SPEED:m=10,BACK_COLOR:d={r:.5,g:0,b:0},TRANSPARENT:h=!0}){let x=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let t,i,o,d,h,g,T,E,R=x.current;if(!R)return;let p=[{id:-1,texcoordX:0,texcoordY:0,prevTexcoordX:0,prevTexcoordY:0,deltaX:0,deltaY:0,down:!1,moved:!1,color:{r:0,g:0,b:0}}],S={SIM_RESOLUTION:e,DYE_RESOLUTION:r,DENSITY_DISSIPATION:n,VELOCITY_DISSIPATION:u,PRESSURE:a,PRESSURE_ITERATIONS:l,CURL:c,SPLAT_RADIUS:f,SPLAT_FORCE:v,SHADING:s,COLOR_UPDATE_SPEED:m},{gl:D,ext:_}=function(e){let r,t,i,o,n={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},u=e.getContext("webgl2",n);if(u||(u=e.getContext("webgl",n)||e.getContext("experimental-webgl",n)),!u)throw Error("Unable to initialize WebGL.");let a="drawBuffers"in u,l=!1;a?(u.getExtension("EXT_color_buffer_float"),l=!!u.getExtension("OES_texture_float_linear")):(r=u.getExtension("OES_texture_half_float"),l=!!u.getExtension("OES_texture_half_float_linear")),u.clearColor(0,0,0,1);let c=a?u.HALF_FLOAT:r&&r.HALF_FLOAT_OES||0;return a?(t=y(u,u.RGBA16F,u.RGBA,c),i=y(u,u.RG16F,u.RG,c),o=y(u,u.R16F,u.RED,c)):(t=y(u,u.RGBA,u.RGBA,c),i=y(u,u.RGBA,u.RGBA,c),o=y(u,u.RGBA,u.RGBA,c)),{gl:u,ext:{formatRGBA:t,formatRG:i,formatR:o,halfFloatTexType:c,supportLinearFiltering:l}}}(R);if(!D||!_)return;function y(e,r,t,i){if(!function(e,r,t,i){let o=e.createTexture();if(!o)return!1;e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,t,i,null);let n=e.createFramebuffer();return!!n&&(e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE)}(e,r,t,i)){if("drawBuffers"in e)switch(r){case e.R16F:return y(e,e.RG16F,e.RG,i);case e.RG16F:return y(e,e.RGBA16F,e.RGBA,i)}return null}return{internalFormat:r,format:t}}function A(e,r,t=null){let i=function(e,r){if(!r)return e;let t="";for(let e of r)t+=`#define ${e}
`;return t+e}(r,t),o=D.createShader(e);return o?(D.shaderSource(o,i),D.compileShader(o),D.getShaderParameter(o,D.COMPILE_STATUS)||console.trace(D.getShaderInfoLog(o)),o):null}function F(e,r){if(!e||!r)return null;let t=D.createProgram();return t?(D.attachShader(t,e),D.attachShader(t,r),D.linkProgram(t),D.getProgramParameter(t,D.LINK_STATUS)||console.trace(D.getProgramInfoLog(t)),t):null}function w(e){let r={},t=D.getProgramParameter(e,D.ACTIVE_UNIFORMS);for(let i=0;i<t;i++){let t=D.getActiveUniform(e,i);t&&(r[t.name]=D.getUniformLocation(e,t.name))}return r}_.supportLinearFiltering||(S.DYE_RESOLUTION=256,S.SHADING=!1);class U{constructor(e,r){this.program=F(e,r),this.uniforms=this.program?w(this.program):{}}bind(){this.program&&D.useProgram(this.program)}}class L{constructor(e,r){this.vertexShader=e,this.fragmentShaderSource=r,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(e){let r=0;for(let t of e)r+=function(e){if(!e.length)return 0;let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t)|0;return r}(t);let t=this.programs[r];if(null==t){let i=A(D.FRAGMENT_SHADER,this.fragmentShaderSource,e);t=F(this.vertexShader,i),this.programs[r]=t}t!==this.activeProgram&&(t&&(this.uniforms=w(t)),this.activeProgram=t)}bind(){this.activeProgram&&D.useProgram(this.activeProgram)}}let b=A(D.VERTEX_SHADER,`
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `),P=A(D.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `),B=A(D.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `),z=`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `,I=A(D.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `),X=A(D.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);

          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
          #ifdef MANUAL_FILTERING
              vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
              vec4 result = bilerp(uSource, coord, dyeTexelSize);
          #else
              vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
              vec4 result = texture2D(uSource, coord);
          #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
    `,_.supportLinearFiltering?null:["MANUAL_FILTERING"]),C=A(D.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;

          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }

          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `),N=A(D.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `),O=A(D.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;

          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;

          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `),M=A(D.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `),Y=A(D.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `),G=(g=D.createBuffer(),D.bindBuffer(D.ARRAY_BUFFER,g),D.bufferData(D.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),D.STATIC_DRAW),T=D.createBuffer(),D.bindBuffer(D.ELEMENT_ARRAY_BUFFER,T),D.bufferData(D.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),D.STATIC_DRAW),D.vertexAttribPointer(0,2,D.FLOAT,!1,0,0),D.enableVertexAttribArray(0),(e,r=!1)=>{D&&(e?(D.viewport(0,0,e.width,e.height),D.bindFramebuffer(D.FRAMEBUFFER,e.fbo)):(D.viewport(0,0,D.drawingBufferWidth,D.drawingBufferHeight),D.bindFramebuffer(D.FRAMEBUFFER,null)),r&&(D.clearColor(0,0,0,1),D.clear(D.COLOR_BUFFER_BIT)),D.drawElements(D.TRIANGLES,6,D.UNSIGNED_SHORT,0))}),V=new U(b,P),H=new U(b,B),k=new U(b,I),W=new U(b,X),K=new U(b,C),j=new U(b,N),q=new U(b,O),$=new U(b,M),J=new U(b,Y),Q=new L(b,z);function Z(e,r,t,i,o,n){D.activeTexture(D.TEXTURE0);let u=D.createTexture();D.bindTexture(D.TEXTURE_2D,u),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_MIN_FILTER,n),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_MAG_FILTER,n),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_WRAP_S,D.CLAMP_TO_EDGE),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_WRAP_T,D.CLAMP_TO_EDGE),D.texImage2D(D.TEXTURE_2D,0,t,e,r,0,i,o,null);let a=D.createFramebuffer();D.bindFramebuffer(D.FRAMEBUFFER,a),D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,u,0),D.viewport(0,0,e,r),D.clear(D.COLOR_BUFFER_BIT);let l=1/e,c=1/r;return{texture:u,fbo:a,width:e,height:r,texelSizeX:l,texelSizeY:c,attach:e=>(D.activeTexture(D.TEXTURE0+e),D.bindTexture(D.TEXTURE_2D,u),e)}}function ee(e,r,t,i,o,n){let u=Z(e,r,t,i,o,n),a=Z(e,r,t,i,o,n);return{width:e,height:r,texelSizeX:u.texelSizeX,texelSizeY:u.texelSizeY,read:u,write:a,swap(){let e=this.read;this.read=this.write,this.write=e}}}function er(e,r,t,i,o,n,u){var a;let l;return e.width===r&&e.height===t?e:(a=e.read,l=Z(r,t,i,o,n,u),V.bind(),V.uniforms.uTexture&&D.uniform1i(V.uniforms.uTexture,a.attach(0)),G(l,!1),e.read=l,e.write=Z(r,t,i,o,n,u),e.width=r,e.height=t,e.texelSizeX=1/r,e.texelSizeY=1/t,e)}function et(){let e=ei(S.SIM_RESOLUTION),r=ei(S.DYE_RESOLUTION),n=_.halfFloatTexType,u=_.formatRGBA,a=_.formatRG,l=_.formatR,c=_.supportLinearFiltering?D.LINEAR:D.NEAREST;D.disable(D.BLEND),t=t?er(t,r.width,r.height,u.internalFormat,u.format,n,c):ee(r.width,r.height,u.internalFormat,u.format,n,c),i=i?er(i,e.width,e.height,a.internalFormat,a.format,n,c):ee(e.width,e.height,a.internalFormat,a.format,n,c),o=Z(e.width,e.height,l.internalFormat,l.format,n,D.NEAREST),d=Z(e.width,e.height,l.internalFormat,l.format,n,D.NEAREST),h=ee(e.width,e.height,l.internalFormat,l.format,n,D.NEAREST)}function ei(e){let r=D.drawingBufferWidth,t=D.drawingBufferHeight,i=r/t,o=Math.round(e),n=Math.round(e*(i<1?1/i:i));return r>t?{width:n,height:o}:{width:o,height:n}}function eo(e){return Math.floor(e*(window.devicePixelRatio||1))}E=[],S.SHADING&&E.push("SHADING"),Q.setKeywords(E),et();let en=Date.now(),eu=0;function ea(){var e,r;let n,u,a,l,c,f,v,s=(u=Math.min(u=((n=Date.now())-en)/1e3,.016666),en=n,u);a=eo(R.clientWidth),l=eo(R.clientHeight),(R.width!==a||R.height!==l)&&(R.width=a,R.height=l,1)&&et(),(eu+=s*S.COLOR_UPDATE_SPEED)>=1&&(e=eu,eu=0==(c=1)?0:(e-0)%c+0,p.forEach(e=>{e.color=ev()})),function(){for(let e of p)e.moved&&(e.moved=!1,function(e){let r=e.deltaX*S.SPLAT_FORCE,t=e.deltaY*S.SPLAT_FORCE;el(e.texcoordX,e.texcoordY,r,t,e.color)}(e))}(),function(e){D.disable(D.BLEND),j.bind(),j.uniforms.texelSize&&D.uniform2f(j.uniforms.texelSize,i.texelSizeX,i.texelSizeY),j.uniforms.uVelocity&&D.uniform1i(j.uniforms.uVelocity,i.read.attach(0)),G(d),q.bind(),q.uniforms.texelSize&&D.uniform2f(q.uniforms.texelSize,i.texelSizeX,i.texelSizeY),q.uniforms.uVelocity&&D.uniform1i(q.uniforms.uVelocity,i.read.attach(0)),q.uniforms.uCurl&&D.uniform1i(q.uniforms.uCurl,d.attach(1)),q.uniforms.curl&&D.uniform1f(q.uniforms.curl,S.CURL),q.uniforms.dt&&D.uniform1f(q.uniforms.dt,e),G(i.write),i.swap(),K.bind(),K.uniforms.texelSize&&D.uniform2f(K.uniforms.texelSize,i.texelSizeX,i.texelSizeY),K.uniforms.uVelocity&&D.uniform1i(K.uniforms.uVelocity,i.read.attach(0)),G(o),H.bind(),H.uniforms.uTexture&&D.uniform1i(H.uniforms.uTexture,h.read.attach(0)),H.uniforms.value&&D.uniform1f(H.uniforms.value,S.PRESSURE),G(h.write),h.swap(),$.bind(),$.uniforms.texelSize&&D.uniform2f($.uniforms.texelSize,i.texelSizeX,i.texelSizeY),$.uniforms.uDivergence&&D.uniform1i($.uniforms.uDivergence,o.attach(0));for(let e=0;e<S.PRESSURE_ITERATIONS;e++)$.uniforms.uPressure&&D.uniform1i($.uniforms.uPressure,h.read.attach(1)),G(h.write),h.swap();J.bind(),J.uniforms.texelSize&&D.uniform2f(J.uniforms.texelSize,i.texelSizeX,i.texelSizeY),J.uniforms.uPressure&&D.uniform1i(J.uniforms.uPressure,h.read.attach(0)),J.uniforms.uVelocity&&D.uniform1i(J.uniforms.uVelocity,i.read.attach(1)),G(i.write),i.swap(),W.bind(),W.uniforms.texelSize&&D.uniform2f(W.uniforms.texelSize,i.texelSizeX,i.texelSizeY),!_.supportLinearFiltering&&W.uniforms.dyeTexelSize&&D.uniform2f(W.uniforms.dyeTexelSize,i.texelSizeX,i.texelSizeY);let r=i.read.attach(0);W.uniforms.uVelocity&&D.uniform1i(W.uniforms.uVelocity,r),W.uniforms.uSource&&D.uniform1i(W.uniforms.uSource,r),W.uniforms.dt&&D.uniform1f(W.uniforms.dt,e),W.uniforms.dissipation&&D.uniform1f(W.uniforms.dissipation,S.VELOCITY_DISSIPATION),G(i.write),i.swap(),!_.supportLinearFiltering&&W.uniforms.dyeTexelSize&&D.uniform2f(W.uniforms.dyeTexelSize,t.texelSizeX,t.texelSizeY),W.uniforms.uVelocity&&D.uniform1i(W.uniforms.uVelocity,i.read.attach(0)),W.uniforms.uSource&&D.uniform1i(W.uniforms.uSource,t.read.attach(1)),W.uniforms.dissipation&&D.uniform1f(W.uniforms.dissipation,S.DENSITY_DISSIPATION),G(t.write),t.swap()}(s),D.blendFunc(D.ONE,D.ONE_MINUS_SRC_ALPHA),D.enable(D.BLEND),f=(r=null,D.drawingBufferWidth),v=r?r.height:D.drawingBufferHeight,Q.bind(),S.SHADING&&Q.uniforms.texelSize&&D.uniform2f(Q.uniforms.texelSize,1/f,1/v),Q.uniforms.uTexture&&D.uniform1i(Q.uniforms.uTexture,t.read.attach(0)),G(r,!1),requestAnimationFrame(ea)}function el(e,r,o,n,u){var a;let l;k.bind(),k.uniforms.uTarget&&D.uniform1i(k.uniforms.uTarget,i.read.attach(0)),k.uniforms.aspectRatio&&D.uniform1f(k.uniforms.aspectRatio,R.width/R.height),k.uniforms.point&&D.uniform2f(k.uniforms.point,e,r),k.uniforms.color&&D.uniform3f(k.uniforms.color,o,n,0),k.uniforms.radius&&D.uniform1f(k.uniforms.radius,(a=S.SPLAT_RADIUS/100,(l=R.width/R.height)>1&&(a*=l),a)),G(i.write),i.swap(),k.uniforms.uTarget&&D.uniform1i(k.uniforms.uTarget,t.read.attach(0)),k.uniforms.color&&D.uniform3f(k.uniforms.color,u.r,u.g,u.b),G(t.write),t.swap()}function ec(e,r,t,i){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=t/R.width,e.texcoordY=1-i/R.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=ev()}function ef(e,r,t,i){var o,n;let u,a;e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/R.width,e.texcoordY=1-t/R.height,o=e.texcoordX-e.prevTexcoordX,(u=R.width/R.height)<1&&(o*=u),e.deltaX=o,n=e.texcoordY-e.prevTexcoordY,(a=R.width/R.height)>1&&(n/=a),e.deltaY=n,e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=i}function ev(){let e=function(e,r,t){let i=0,o=0,n=0,u=Math.floor(6*e),a=6*e-u,l=0,c=+(1-a),f=+(1-(1-a)*1);switch(u%6){case 0:i=1,o=f,n=l;break;case 1:i=c,o=1,n=l;break;case 2:i=l,o=1,n=f;break;case 3:i=l,o=c,n=1;break;case 4:i=f,o=l,n=1;break;case 5:i=1,o=l,n=c}return{r:i,g:o,b:n}}(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}window.addEventListener("mousedown",e=>{let r,t,i,o=p[0];ec(o,-1,eo(e.clientX),eo(e.clientY)),r=ev(),r.r*=10,r.g*=10,r.b*=10,t=10*(Math.random()-.5),i=30*(Math.random()-.5),el(o.texcoordX,o.texcoordY,t,i,r)}),document.body.addEventListener("mousemove",function e(r){let t=p[0],i=eo(r.clientX),o=eo(r.clientY),n=ev();ea(),ef(t,i,o,n),document.body.removeEventListener("mousemove",e)}),window.addEventListener("mousemove",e=>{let r=p[0],t=eo(e.clientX),i=eo(e.clientY),o=r.color;ef(r,t,i,o)}),document.body.addEventListener("touchstart",function e(r){let t=r.targetTouches,i=p[0];for(let e=0;e<t.length;e++){let r=eo(t[e].clientX),o=eo(t[e].clientY);ea(),ec(i,t[e].identifier,r,o)}document.body.removeEventListener("touchstart",e)}),window.addEventListener("touchstart",e=>{let r=e.targetTouches,t=p[0];for(let e=0;e<r.length;e++){let i=eo(r[e].clientX),o=eo(r[e].clientY);ec(t,r[e].identifier,i,o)}},!1),window.addEventListener("touchmove",e=>{let r=e.targetTouches,t=p[0];for(let e=0;e<r.length;e++)ef(t,eo(r[e].clientX),eo(r[e].clientY),t.color)},!1),window.addEventListener("touchend",e=>{let r=e.changedTouches,t=p[0];for(let e=0;e<r.length;e++)t.down=!1})},[e,r,t,n,u,a,l,c,f,v,s,m,d,h]),(0,i.jsx)("div",{style:{position:"fixed",top:0,left:0,zIndex:50,pointerEvents:"none",width:"100%",height:"100%"},children:(0,i.jsx)("canvas",{ref:x,id:"fluid",style:{width:"100vw",height:"100vh",display:"block"}})})}}}]);
//# sourceMappingURL=8346.84ef8012149a7ea5.js.map