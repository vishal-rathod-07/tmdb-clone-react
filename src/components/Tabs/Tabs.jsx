import './tabs.scss';

const Tabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className='selector_wrapper'>
      <div className='selector'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`anchor ${tab.id === activeTab ? 'active' : ''}`}
            onClick={() => onTabClick(tab.id)}
          >
            <h3>
              <div>{tab.title}</div>
            </h3>
            <div className='background'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
