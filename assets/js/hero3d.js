/* HIVE – 3D hero scenes (three.js r160, UMD build in assets/js/vendor)
   data-mode="hive"   : animated 3D honeycomb (HIVE identity)
   data-mode="neural" : AI neural constellation (Industry Connect)
   data-mode="books"  : floating hexagon field (Publications) */
(function(){
  const cv=document.querySelector('canvas.three');
  if(!cv||!window.THREE)return;
  const T=THREE,mode=cv.dataset.mode||'hive';
  let R;
  try{R=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true});}catch(e){cv.remove();return;}
  R.setPixelRatio(Math.min(window.devicePixelRatio,2));
  const S=new T.Scene();S.fog=new T.FogExp2(0x04241c,0.016);
  const C=new T.PerspectiveCamera(45,1,0.1,200);
  const GREEN=0x02775A,GOLD=0xC8A736;
  S.add(new T.AmbientLight(0xffffff,0.45));
  const d1=new T.DirectionalLight(0xfff1c4,2.4);d1.position.set(8,14,10);S.add(d1);
  const p1=new T.PointLight(0x2fe0b0,2.2,60);p1.position.set(-8,4,6);S.add(p1);
  const p2=new T.PointLight(GOLD,2.5,50);p2.position.set(6,-2,8);S.add(p2);
  const root=new T.Group();S.add(root);
  let tick=()=>{};

  // ---- floating gold dust (all modes)
  const dustN=500,dg=new T.BufferGeometry(),dp=new Float32Array(dustN*3);
  for(let i=0;i<dustN;i++){dp[i*3]=(Math.random()-.5)*60;dp[i*3+1]=(Math.random()-.5)*36;dp[i*3+2]=(Math.random()-.5)*40;}
  dg.setAttribute('position',new T.BufferAttribute(dp,3));
  const dust=new T.Points(dg,new T.PointsMaterial({color:GOLD,size:0.08,transparent:true,opacity:.8}));S.add(dust);

  if(mode==='hive'||mode==='books'){
    // ---- honeycomb of hexagonal prisms (instanced)
    const rad=1,gap=0.12,w=Math.sqrt(3)*(rad+gap),hgt=1.5*(rad+gap);
    const geo=new T.CylinderGeometry(rad,rad,1,6,1);geo.translate(0,0.5,0);
    const matG=new T.MeshStandardMaterial({color:0x0b9b74,metalness:.45,roughness:.3,emissive:0x02634a,emissiveIntensity:.55});
    const matY=new T.MeshStandardMaterial({color:0xd9b84a,metalness:.35,roughness:.35,emissive:0x8a6c14,emissiveIntensity:.65});
    const cells=[];const RING=mode==='books'?6:7;
    for(let q=-RING;q<=RING;q++)for(let r=-RING;r<=RING;r++){
      const s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>RING)continue;
      cells.push({x:w*(q+r/2),z:hgt*r,d:Math.sqrt(q*q+r*r+q*r),gold:Math.random()<0.09});
    }
    const ng=cells.filter(c=>!c.gold),ny=cells.filter(c=>c.gold);
    const IG=new T.InstancedMesh(geo,matG,ng.length),IY=new T.InstancedMesh(geo,matY,ny.length);
    root.add(IG,IY);
    // edge glow lines
    const eg=new T.EdgesGeometry(new T.CylinderGeometry(rad*1.001,rad*1.001,0.02,6,1));
    const lineMat=new T.LineBasicMaterial({color:0xf0d27a,transparent:true,opacity:.7});
    const tops=new T.Group();root.add(tops);
    cells.forEach(c=>{const l=new T.LineSegments(eg,lineMat);l.position.set(c.x,0,c.z);c.line=l;tops.add(l);});
    const M=new T.Object3D();
    root.rotation.set(-0.95,0.0,0.18);
    if(mode==='hive'){root.position.set(9,-1.5,-4);C.position.set(0,0,34);}
    else{root.position.set(6,-1,-2);C.position.set(0,0,22);}
    // hero icon: two floating gold cubes (from HIVE logo)
    const cubeM=new T.MeshStandardMaterial({color:GOLD,metalness:.9,roughness:.2,emissive:0x5a4510,emissiveIntensity:.5});
    const cubes=[new T.Mesh(new T.BoxGeometry(1.1,1.1,1.1),cubeM),new T.Mesh(new T.BoxGeometry(1.1,1.1,1.1),cubeM)];
    cubes[0].position.set(5.5,5.2,2);cubes[1].position.set(10.5,6.4,0);cubes.forEach(c=>S.add(c));
    tick=(t)=>{
      const upd=(arr,mesh)=>{arr.forEach((c,i)=>{
        const h=0.6+ (Math.sin(c.d*0.9-t*1.6)+1)*0.9 + (c.gold?0.8:0);
        M.position.set(c.x,0,c.z);M.scale.set(1,h,1);M.updateMatrix();mesh.setMatrixAt(i,M.matrix);
        c.line.position.y=h+0.01;});mesh.instanceMatrix.needsUpdate=true;};
      upd(ng,IG);upd(ny,IY);
      root.rotation.z=0.18+Math.sin(t*0.15)*0.08;root.rotation.y=t*0.04;
      cubes.forEach((c,i)=>{c.rotation.x=t*(0.5+i*0.2);c.rotation.y=t*(0.7-i*0.1);c.position.y+=Math.sin(t*1.2+i)*0.004;});
    };
  }
  if(mode==='neural'){
    // ---- brain-like constellation of nodes + links + circuit roots
    const N=420,pos=[],col=[];
    for(let i=0;i<N;i++){
      const y=1-(i/(N-1))*2,rr=Math.sqrt(1-y*y),th=i*2.399963;
      let x=Math.cos(th)*rr,z=Math.sin(th)*rr;
      const k=1+ (Math.random()-.5)*0.12;
      pos.push(new T.Vector3(x*7.2*k,y*5.6*k+ (y>0?0:y*0.6),z*5.8*k));
    }
    const g=new T.BufferGeometry().setFromPoints(pos);
    const cArr=new Float32Array(N*3);const cG=new T.Color(GOLD),cW=new T.Color(0xffffff);
    for(let i=0;i<N;i++){const c=Math.random()<.25?cW:cG;cArr.set([c.r,c.g,c.b],i*3);}
    g.setAttribute('color',new T.BufferAttribute(cArr,3));
    const pts=new T.Points(g,new T.PointsMaterial({size:0.22,vertexColors:true,transparent:true,opacity:.95}));
    root.add(pts);
    const seg=[];
    for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){if(pos[i].distanceTo(pos[j])<1.75)seg.push(pos[i],pos[j]);}
    const lg=new T.BufferGeometry().setFromPoints(seg);
    root.add(new T.LineSegments(lg,new T.LineBasicMaterial({color:0x2fbf92,transparent:true,opacity:.38})));
    // circuit roots
    const roots=[];for(let k=0;k<14;k++){const x0=(k-6.5)*0.7;let p=new T.Vector3(x0*0.6,-5.4,0);const path=[p.clone()];
      for(let s=0;s<5;s++){p=p.clone().add(new T.Vector3(0,-1.1,0));path.push(p.clone());p=p.clone().add(new T.Vector3(x0>0?0.6:-0.6,-0.6,0));path.push(p.clone());}
      for(let s=0;s<path.length-1;s++)roots.push(path[s],path[s+1]);}
    root.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(roots),new T.LineBasicMaterial({color:GOLD,transparent:true,opacity:.55})));
    // pulses travelling along links
    const PN=60,pg=new T.BufferGeometry(),pp=new Float32Array(PN*3);pg.setAttribute('position',new T.BufferAttribute(pp,3));
    const pulses=[];for(let k=0;k<PN;k++){const s=Math.floor(Math.random()*(seg.length/2))*2;pulses.push({s,t:Math.random()});}
    root.add(new T.Points(pg,new T.PointsMaterial({color:0xfff2b0,size:0.32,transparent:true,opacity:1})));
    root.position.set(7.5,1.2,-2);C.position.set(0,0,24);
    tick=(t,dt)=>{root.rotation.y=t*0.12;root.rotation.x=Math.sin(t*0.2)*0.08;
      pulses.forEach((p,k)=>{p.t+=dt*1.2;if(p.t>1){p.t=0;p.s=Math.floor(Math.random()*(seg.length/2))*2;}
        const a=seg[p.s],b=seg[p.s+1];pp[k*3]=a.x+(b.x-a.x)*p.t;pp[k*3+1]=a.y+(b.y-a.y)*p.t;pp[k*3+2]=a.z+(b.z-a.z)*p.t;});
      pg.attributes.position.needsUpdate=true;
      const s=1+Math.sin(t*2)*0.04;pts.material.size=0.22*s;};
  }

  // ---- responsive layout
  function size(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();
    const mobile=w<900;if(mode!=='neural'){root.position.x=mobile?0:(mode==='hive'?11:8);root.position.y=mobile?-8:(mode==='hive'?-2.5:-1.5);}else{root.position.x=mobile?0:7.5;root.position.y=mobile?-3:1.2;root.scale.setScalar(mobile?.7:1);}}
  window.addEventListener('resize',size);size();
  // ---- mouse parallax
  let mx=0,my=0;window.addEventListener('pointermove',e=>{mx=(e.clientX/window.innerWidth-.5);my=(e.clientY/window.innerHeight-.5);});
  let vis=true;new IntersectionObserver(es=>{vis=es[0].isIntersecting;}).observe(cv);
  const clock=new T.Clock();
  (function loop(){requestAnimationFrame(loop);if(!vis)return;const dt=Math.min(clock.getDelta(),0.05),t=clock.elapsedTime;
    tick(t,dt);dust.rotation.y=t*0.02;
    C.position.x+=(mx*3-C.position.x)*0.04;C.position.y+=(-my*2-C.position.y)*0.04;C.lookAt(0,0,0);
    R.render(S,C);})();
})();
