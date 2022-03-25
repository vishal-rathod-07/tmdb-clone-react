const SortcutBar = () => {
  return (
    <div className='sortcut-bar w-100 d-flex justify-content-center'>
      <ul className='d-flex h-100 flex-nowrap'>
        <li>
          <span>
            Overview
            <span className='arrow' />
          </span>
        </li>
        <li>
          <span>
            Media
            <span className='arrow' />
          </span>
        </li>
        <li>
          <span>
            Fandom
            <span className='arrow' />
          </span>
        </li>
        <li>
          <span>
            Share
            <span className='arrow' />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SortcutBar;
