---
title: '[3D] babylon.js 기초'
date: 2022-11-03 14:22:13
category: 'fundamental'
draft: false
---

![Babylonjsidentitycolor](https://user-images.githubusercontent.com/63533584/199648759-957a44e8-e8c8-44fa-9554-5547da0bf05b.png)

## babylon.js란

WebGL 베이스의 3D 엔진으로 사용 편의성에 중점을 두었다는 장점이 있다.

(npm package와 cdn 방식 지원)

<br />

## 3D 기본 요소 세가지

![122A44484F0653932D](https://user-images.githubusercontent.com/63533584/199648339-83cec9db-d687-43ff-9c63-8158d1a31e22.jpeg)

일반적인 웹 화면과 다르게 x, y, z 값을 가진 3차원 공간에 대한 기본적인 정의가 필요하다.

**1. scene**

3D 요소를 위치시킬 공간

**2. camera**

공간을 보는 시점

- ArcRotateCamera
- FlyCamera
- FollowCamera
- ArcFollowCamera
- FreeCamera

**3. light**

공간에 적용되는 광원

- HemisphericLight
- IShadowLight
- ShadowLight

<br />

```javascript
const createScene = function() {
  // 기본 공간 설정
  const scene = new BABYLON.Scene(engine)
  // 카메라 위치 설정
  const camera = new BABYLON.FreeCamera(
    'camera1',
    new BABYLON.Vector3(0, 5, -10),
    scene
  )
  // 카메라 시점 설정 (바라볼 타겟 지점)
  camera.setTarget(BABYLON.Vector3.Zero())
  // Attaches the camera to the canvas
  camera.attachControl(canvas, true)
  // 광원 설정
  const light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 0),
    scene
  )
  // 빛 세기 정도 (default: 1)
  light.intensity = 0.7

  return scene
}
```

<br />

## built-in shape

babylon.js는 구, 육면체, 캡슐, 폴리곤, 리본 등 다양한 빌트인 메쉬를 가지고 있다.

[Mesh | Babylon.js Documentation](https://doc.babylonjs.com/typedoc/modules/BABYLON.Mesh)

<br />

> **Mesh**
>
> 메쉬란 3차원 모형을 정의하기 위해 삼각형이나 사각형 등의 폴리곤을 사용하는 정점, 모서리, 면 등으로 구성 것. 완성된 모델과 달리 질량 성질을 가지고 있지 않다.
>
> ![spheresurface](https://user-images.githubusercontent.com/63533584/199648876-8b59584b-e0cc-4757-90f3-89473b795fc4.png)
>
> ![Dolphintrianglemesh](https://user-images.githubusercontent.com/63533584/199648847-b633c463-4247-4f53-9d9b-77366241df1e.png)

<br />

```javascript
const createScene = function() {
  //...
  // 구
  const sphere = BABYLON.MeshBuilder.CreateSphere(
    'sphere',
    { diameter: 2, segments: 32 },
    scene
  )
  sphere.position.y = 1

  // 지면
  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 6, height: 6 },
    scene
  )
  return scene
}
```

<br />

## built-in shape & material 적용하기

**체커보드 구**

![스크린샷 2022-11-03 오후 2 35 44](https://user-images.githubusercontent.com/63533584/199653989-f4f94abf-5916-4b5f-b8aa-38f27ec611cd.png)

```javascript
const createScene = function() {
  const scene = new BABYLON.Scene(engine)

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 6,
    150,
    BABYLON.Vector3.Zero(),
    scene
  )

  camera.setTarget(BABYLON.Vector3.Zero())
  camera.attachControl(canvas, true)

  const light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 0),
    scene
  )
  light.intensity = 0.7

  const sphere = BABYLON.MeshBuilder.CreateSphere(
    'sphere',
    { diameter: 10, segments: 32 },
    scene
  )

  const sphereMaterial = new BABYLON.StandardMaterial('Sphere Material', scene)
  sphere.material = sphereMaterial
  let sphereTexture = new BABYLON.Texture(
    Assets.textures.checkerboard_basecolor_png.rootUrl,
    scene
  )
  sphere.material.diffuseTexture = sphereTexture

  sphere.position.y = 9

  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 10, height: 10 },
    scene
  )

  return scene
}
```

<br />

**털 구**

![스크린샷 2022-11-03 오후 2 36 23](https://user-images.githubusercontent.com/63533584/199653991-4385e45d-c793-430b-b3a1-d0395e20513d.png)

```javascript
const createScene = function() {
  const scene = new BABYLON.Scene(engine)

  // const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 50, 50), scene);
  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 6,
    150,
    BABYLON.Vector3.Zero(),
    scene
  )

  camera.setTarget(BABYLON.Vector3.Zero())
  camera.attachControl(canvas, true)

  const light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 0),
    scene
  )
  light.intensity = 0.7

  const sphere = BABYLON.MeshBuilder.CreateSphere(
    'sphere',
    { diameter: 10, segments: 32 },
    scene
  )

  const furMaterial = new BABYLON.FurMaterial('fur', scene)
  const furTexture = BABYLON.FurMaterial.GenerateTexture('furTexture', scene)
  furMaterial.furTexture = furTexture
  furMaterial.furLength = 1
  furMaterial.furAngle = 0
  furMaterial.furColor = new BABYLON.Color3(1, 1, 1)
  furMaterial.diffuseTexture = new BABYLON.Texture('textures/fur.jpg', scene)
  furMaterial.furTexture = BABYLON.FurMaterial.GenerateTexture(
    'furTexture',
    scene
  )
  furMaterial.furSpacing = 6
  furMaterial.furDensity = 10
  furMaterial.furSpeed = 200
  furMaterial.furGravity = new BABYLON.Vector3(0, -1, 0)
  sphere.material = furMaterial

  const quality = 30
  const shells = BABYLON.FurMaterial.FurifyMesh(sphere, quality)

  sphere.position.y = 9

  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 10, height: 10 },
    scene
  )

  return scene
}
```

<br />
<br />

**references**

[babylon.js](https://www.babylonjs.com/)

[documentation](https://doc.babylonjs.com/)

<br/>
<br/>
<br/>
<br/>
