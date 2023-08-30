import "./Bookservices.css";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useUser } from '../../context/UserContext';
import 'whatwg-fetch';

function Booktoservices() {

  const [reserveData, setReserveData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { userData } = useUser();
  console.log(userData);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  const columns = [
    { id: 'num', label: 'ลำดับ'},
    { id: 'vechicle_reg', label: 'ทะเบียนรถ' },
    { id: 'reserve_date', label: 'วันที่' },
    { id: 'status', label: 'สถานะ' },
    { id: 'detail', label: 'รายละเอียด' },
  ];

  const [errMsg, setErrMsg] = useState('');
  const [vechile,setVechile] = useState();
  const [date,setDate] = useState();
  const [detail,setDetail] = useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredReserveData = reserveData.filter((row) =>
  columns.some((column) => {
    const value = row[column.id];
    return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
  })
  );

  useEffect(() => {
    fetch('http://localhost:3456/fetchreserve')
      .then(response => response.json())
      .then(data => {
        setReserveData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test")
    try {
      const response = await fetch('http://localhost:3456/bookqueue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: userData.uid,
          vechicle_reg: vechile,
          reserve_date: date,
          detail: detail,
        }),
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result)
      } else {
        console.log("error")
        setErrMsg('Login Failed');
      }
    } catch (err) {
      console.log("error : ",err)
    }
  }
  const startingIndex = page * rowsPerPage;
  
  const handleListTable = (clickedRow) => {
    console.log("Clicked Row Data:", clickedRow);
  }

  const handleCombinedClick = (row) => {
    handleListTable(row);
    handleShowDetail();
  };

  return (
    <>
      <div>
        <Container>
          <h1 className='text-center mt-4'>รายการ</h1>
          <Form>
            <InputGroup className='my-3'>
              <Form.Control
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder='Search'
              />
            </InputGroup>
          </Form>
        </Container>
      </div>
      <div>
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 0 }}>
          <TableContainer sx={{ maxHeight: '100vh'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ 
                        backgroundColor: "gray",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReserveData
                .slice(startingIndex, startingIndex + rowsPerPage)
                  .map((row, index) => (
                    <TableRow className="row-pointer" hover role="checkbox" tabIndex={-1} key={row.num} onClick={() => handleCombinedClick(row)}>
                      <TableCell align="center">{startingIndex + index + 1}</TableCell>
                      {columns.slice(1).map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="center">
                            {/* Commented out the original line */}
                            {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Row>
            <Col>
              <Button 
                variant="secondary" 
                onClick={handleShow}
                style={{margin: 10}}>
                จองคิวเข้าซ่อม
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>ระบบจองคิวเข้าใช้บริการ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <TextField
                        id="outlined"
                        label="ทะเบียนรถ"
                        style={{width: '100%'}}
                        onChange={(e)=>setVechile(e.target.value)}
                        value={vechile}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker 
                          label="เลือกวันจองเข้าใช้บริการ" 
                          onChange={(e)=>setDate(e)}
                          value={date}/>
                        </DemoContainer>
                      </LocalizationProvider>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <TextField
                        id="outlined-multiline-static"
                        label="รายละเอียด"
                        multiline
                        rows={4}
                        style={{width: '100%'}}
                        onChange={(e)=>setDetail(e.target.value)}
                        value={detail}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                  <Modal.Title>ข้อมูลการจองซ่อม</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <TextField
                  id="outlined-read-only-input"
                  label="Read Only"
                  defaultValue=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDetail}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleCloseDetail}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

            </Col>
            <Col>
              <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={reserveData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              />   
            </Col>
          </Row>
        </Paper>
      </div>
    </>
  );
}

export default Booktoservices;
