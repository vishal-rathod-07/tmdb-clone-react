import { Accordion, Dropdown, DropdownButton } from 'react-bootstrap';

function SortSectionAccordian(props) {
  return (
    <div className='filter-section_wrapper'>
      <Accordion
        defaultActiveKey='0'
        style={{
          width: '100%',
          borderRadius: '8px',
        }}
      >
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Sort</Accordion.Header>
          <Accordion.Body>
            <h3
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                fontSize: '1em',
                fontWeight: '300',
                marginBottom: '10px',
                color: '#000',
              }}
              className='filter-title p-0'
            >
              Sort Results By
            </h3>
            <DropdownButton
              id='dropdown-basic-button'
              title={props.dropdownTitle}
              variant='secondary'
              style={{
                width: '100%',
                fontSize: '1em',
                fontWeight: '300',
              }}
              onSelect={(eventKey) => {
                props.setUrlParams({ ...props.urlParams, sort_by: eventKey });
              }}
            >
              <Dropdown.Item eventKey='popularity.desc'>
                Popularity Descending
              </Dropdown.Item>
              <Dropdown.Item eventKey='popularity.asc'>
                Popularity Ascending
              </Dropdown.Item>
              <Dropdown.Item eventKey='vote_average.desc'>
                Rating Descending
              </Dropdown.Item>
              <Dropdown.Item eventKey='vote_average.asc'>
                Rating Ascending
              </Dropdown.Item>
              <Dropdown.Item eventKey='primary_release_date.desc'>
                Release Date Descending
              </Dropdown.Item>
              <Dropdown.Item eventKey='primary_release_date.asc'>
                Release Date Ascending
              </Dropdown.Item>
              <Dropdown.Item eventKey='title.asc'>Title (A-Z)</Dropdown.Item>
              <Dropdown.Item eventKey='title.desc'>Title (Z-A)</Dropdown.Item>
            </DropdownButton>
            {/* <Form.Select
             aria-label='Default select example'
             defaultValue={urlParams.sort_by}
             onChange={(event) => {
               setUrlParams({
                 ...urlParams,
                 sort_by: event.target.value,
               });
             }}
             style={{
               width: '100%',
               fontSize: '1em',
               fontWeight: '300',
             }}
            >
             <option value='popularity.desc'>
               Popularity Descending
             </option>
             <option value='popularity.asc'>
               Popularity Ascending
             </option>
             <option value='vote_average.desc'>
               Rating Descending
             </option>
             <option value='vote_average.asc'>
               Rating Ascending
             </option>
             <option value='primary_release_date.desc'>
               Release Date Descending
             </option>
             <option value='primary_release_date.asc'>
               Release Date Ascending
             </option>
             <option value='title.asc'>Title (A-Z)</option>
             <option value='title.desc'>Title (Z-A)</option>
            </Form.Select> */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default SortSectionAccordian;
