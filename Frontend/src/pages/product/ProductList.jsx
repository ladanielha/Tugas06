import { useEffect, useState } from "react";
// import useFormatter from "../../libs/hooks/useFormatter";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
// import useMessage from "../../libs/hooks/useMessage";
import { BASE_URL } from "../../libs/config/settings";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import WidgetCommonLoadingTable from "../../widgets/common/WidgetCommonLoadingTable";
import WidgetCommonPagination from "../../widgets/common/WidgetCommonPagination";
import { PaginationData } from "../../data/PaginationsData";
import WidgetCommonSearch from "../../widgets/common/WidgetCommonSearch";
import WidgetCommonLimit from "../../widgets/common/WidgetCommonLimit";

const ProductList = () => {
  const http = useHTTP();
  const jwt = useJWT();
  // const message = useMessage();
  // const formatter = useFormatter();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [paginateBarang, setPaginateBarang] = useState(PaginationData);

  const onBarangList = (page, search, limit=2) => {
    const url = `${BASE_URL}/barang/`;
    
    const params = { page, limit, search };
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params,
    };

    http.privateHTTP
      .get(url, config)
      .then((response) => {
        const { results, ...paginate } = response.data;
        setDaftarBarang(results);
        setPaginateBarang(paginate);
      })
      .catch((error) => {
        console.log(error);
        // message.error(error);
      });
  };

  const onBarangPaginate = (page) => {
    onBarangList(page);
  }

  const onBarangSearch = (search) => {
   onBarangList(null, search);
  }

  const onBarangLimit = (limit) => {
   onBarangList(null,null, limit);
  }

  useEffect(() => {
    onBarangList();
  }, []);

  return (
    <>
      <Container className="mb-4 mt-4">
        <Row className="mb-3">
          <Col>
            <h2>Kelola Barang</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button>Barang Baru</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={5}>
           <WidgetCommonSearch callback={onBarangSearch}/>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={5}>
           <WidgetCommonLimit callback={onBarangLimit}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <WidgetCommonLoadingTable>
              <Table responsive={true} bordered={true} striped={true}>
                <thead>
                  <tr>
                    <th>Nomor</th>
                    <th>Nama</th>
                    <th>Satuan</th>
                    <th>Harga Jual</th>
                    <th>Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarBarang.map((barang) => (
                    <tr key={barang._id}>
                      <td>{barang.nomor}</td>
                      <td>{barang.nama}</td>
                      <td>{barang.satuan}</td>
                      <td>{barang.hargaJual}</td>
                      <td>{barang.stok}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </WidgetCommonLoadingTable>
          </Col>
        </Row>
        <Row>
          <Col>
            <WidgetCommonPagination
              pagination={paginateBarang}
              callback={onBarangPaginate}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
