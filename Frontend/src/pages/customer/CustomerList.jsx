import { useEffect, useState } from "react";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
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
import useMessage from "../../libs/hooks/useMessage";
import useFormatter from "../../libs/hooks/useFormatter";

const CustomerList = () => {
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter();


  const [daftarCustomer, setDaftarCustomer] = useState([]);
  const [paginateCustomer, setPaginateCustomer] = useState(PaginationData);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [noDataFound, setNoDataFound] = useState(false); // State to manage no data found state

  const onCustomerList = (page, search, limit = 2) => {
    setLoading(true); // Set loading to true when fetching data

    const url = `${BASE_URL}/customer/`;
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
        setDaftarCustomer(results);
        setPaginateCustomer(paginate);
        setLoading(false); // Set loading to false when data fetching is done
        if (results.length === 0) {
          setNoDataFound(true); // Set noDataFound to true if no data is found
        } else {
          setNoDataFound(false); // Set noDataFound to false if data is found
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false in case of error
      });
  };

  const onCustomerPaginate = (page) => {
    onCustomerList(page);
  };

  const onCustomerSearch = (search) => {
    onCustomerList(null, search);
  };

  const onCustomerLimit = (limit) => {
    onCustomerList(null, null, limit);
  };

  useEffect(() => {
    onCustomerList();
  }, []);

  return (
    <>
      <Container className="mb-4 mt-4">
        <Row className="mb-3">
          <Col>
            <h2>Kelola Customer</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button>Customer Baru</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={5}>
            <WidgetCommonSearch callback={onCustomerSearch} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={5}>
            <WidgetCommonLimit callback={onCustomerLimit} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <WidgetCommonLoadingTable loading={loading}>
              {noDataFound ? ( // Conditional rendering for no data found
                <p>No data found.</p>
              ) : (
                <Table responsive bordered striped>
                  <thead>
                    <tr>
                      <th>Nomor</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>No Telp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarCustomer.map((customer) => (
                      <tr key={customer._id}>
                        <td>{customer.nomor}</td>
                        <td>{customer.nama}</td>
                        <td>{customer.alamat}</td>
                        <td>{customer.telepon}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </WidgetCommonLoadingTable>
          </Col>
        </Row>
        <Row>
          <Col>
            <WidgetCommonPagination
              pagination={paginateCustomer}
              callback={onCustomerPaginate}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CustomerList;
