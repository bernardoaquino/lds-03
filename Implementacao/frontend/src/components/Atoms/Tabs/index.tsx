import React, { useState } from 'react';

import * as El from './Tabs.style';

type Tab = {
  title: string;
  onActive?: Function;
  onUnactive?: Function;
  content: React.ReactElement;
}

export type TabsProps = {
  activeTab?: number;
  tabs: Tab[];
}

const Tabs = ({
  tabs,
  activeTab: _activeTab
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(_activeTab ?? 0);

  const onActivateTab = (tabIndex: number) => {
    tabs[activeTab].onUnactive?.();
    setActiveTab(tabIndex);
    tabs[tabIndex].onActive?.();
  }

  return (
    <El.Wrapper>
      <El.OptionList>
        {tabs.map(({ title }, index) => (
          <El.Option active={activeTab === index} onClick={() => onActivateTab(index)}>{title}</El.Option>
        ))}
      </El.OptionList>
      {tabs[activeTab].content}
    </El.Wrapper>
  )
}

export default Tabs;
