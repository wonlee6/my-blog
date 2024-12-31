---
title: 'Recoil - Advanced'
createdAt: '2024-06-24'
tag: 'recoil'
description: 'Recoil Best Practice에 대한 고찰'
---

# Recoil - Best Practice

회사에서 근2년 넘게 `Recoil` 사용하면서 어느정도 익숙해전 것 같다.
그동안 이 방법 저 방법 사용하면서 어떻게 해야 효율적으로 관리 할 수 있을까?에 대한 기록

처음 리코일을 사용할 때 공식 문서 보면서 `atom`, `atomFamily`, `selector`, `selectorFamily` 다 심플하게 사용한 것 같다.

하지만 업무를 진행하다보면 다양한 상황에 직면하게 되고, 그 상황속에서 효율적으로 작업하게 위해 계속해서 리팩토링을 진행한다.

## Function

```tsx
// in something component...
export const recoilFn = () => ({
    recoilCallback: useRecoilCallback,
    selectedChartType: useRecoilValue(chartType),
    chartState: simpleChartSelectedItem,
    readonly: useRecoilValue(chartReadonly),
    ...
});


export default function ChartOverlay(props: Props) {
  const {selectedChartItem} = chartRecoilFn();

  const hideOverlay = () => {
    props.setVisible(false);
  };

  return (
    <Modal
      header={<h5 style={{fontSize: "1rem"}}>{$II.viewCode}</h5>}
      visible={props.visible}
      onHide={hideOverlay}
      style={{width: "80vh", height: "90vh"}}
      footer={
        <div className={`w-100 mt-2 mb-2 d-flex justify-content-end`}>
          <Modal.CloseBtn onClick={hideOverlay} />
        </div>
      }
    >
      ...
    </Modal>
  );
}
```

이런 식으로 하나의 도메인 내 리코일만 모아서 `recoilFn()` 함수를 만들어 사용도 해보았다.  
장점이라면 하나의 함수에만 집중해서 사용할 수 있다.

> 관심사 분리 및 집중 (import도 줄어듬)

단점은 재사용이 어렵고, 리코일 상태가 많아 질수록 지저분해진다.

## Custom hook

#### 컴포넌트에는 UI로직만 남기고, 비즈니스 로직은 커스텀 훅으로 빼서 작업을 진행

```ts
const usePortal = (): ReturnPortalModel => {
  const portalState = useRecoilValue(portalAtom)

  const handleSelectConfigItem = useRecoilCallback(
    ({ set }) =>
      (config: BaseConfigModel) => {
        set(portalAtom, (prevState) => ({ ...prevState, selectedConfigItem: config }))
      },
    []
  )

  const handleCopyConfigItem = useRecoilCallback(
      ({set, snapshot}) =>
          async (config: BaseConfigModel) => {
              ...
          },
      [portalState]
  );
  ...
}

export default usePortal
```

이런 식으로 커스텀 훅에서 `useRecoilCallback` 사용하여 한곳에서 관리

## Selector

```ts
const selector = selector<SelectorModel>({
  key: '___selector',
  get: ({ getCallback }) => {
    const onShowLeftPanel = getCallback(({ set }) => () => {
      set(portalAtom, (prevState) => ({
        ...prevState,
        isShowLeftPanel: !prevState.isShowLeftPanel
      }))
    })

    const onFetchConfigList = getCallback(({ set }) => (configList: MockupConfigModel[]) => {
      set(portalAtom, (prevState) => ({ ...prevState, configList }))
    })

    const onSelectConfigItem = getCallback(({ set }) => (config: MockupConfigModel) => {
      set(portalAtom, (prevState) => ({ ...prevState, selectedConfigItem: config }))
    })

    return {
      onShowLeftPanel,
      onFetchConfigList,
      onSelectConfigItem
    }
  }
})
```

이런식으로 `getCallback`을 이용해서 한 곳에서 관리할 수도 있다.

회사 내 개발 환경에서 어떠한 리코일 버그에 직면했고, 이 구조는 사용할 수 없는 것을 깨달았다... ~~getCallback이 다시 실행안됨...~~

그래서 현재 커스텀 훅 내에서 관리하는 구조로 작업하고 있다.

리코일 업데이트는 멈추었고, 나는 `zustand`로 간다.