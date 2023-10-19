import {
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import { Card, CardContent, CardActions, Button } from "@mui/material";

import { ProductItem } from "./ProductItem";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../api/apiHandler";

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [totalProduct, setTotalProduct] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const defaultQueryString = {
    page,
    rowsPerPage,
    search,
  };
  useEffect(() => {
    for (const [key, value] of Object.entries(defaultQueryString)) {
      if (!searchParams.has(key)) {
        searchParams.set(key, value);
      }
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    let page = +searchParams.get("page");
    let rowsPerPage = +searchParams.get("rowsPerPage");
    let search = searchParams.get("search") || "";

    setPage(+page);
    setRowsPerPage(+rowsPerPage);
    setSearch(search);

    setLoading(true);
    getProducts({ page, rowsPerPage, search }).then((res) => {
      if (res.status === 200) {
        setProducts(res.data.products);
        setTotalProduct(res.data.totalProduct);
        setLoading(false);
        setInitialFetchDone(true);
      }
    });
  }, [searchParams]);

  const handleChangePage = (event, newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  const handleChangeRowsPerPage = (event) => {
    searchParams.set("page", 0);
    searchParams.set("rowsPerPage", event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Typography
        variant="h4"
        color="text-primary"
        sx={{ textAlign: "center", paddingTop: "20px", letterSpacing: "1em" }}
      >
        PRODUCT LIST
      </Typography>
      <h1> </h1>
      <TextField
        label="Search products..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="text-primary" />
            </InputAdornment>
          ),
          sx: {
            color: "#323031",
            "& fieldset": { borderColor: "#323031" },
            "&:hover fieldset": { borderColor: "#323031" },
            width: "95vw",
          },
        }}
        InputLabelProps={{
          sx: {
            color: "white",
          },
        }}
        value={search}
        onChange={(e) => {
          searchParams.set("search", e.target.value);
          searchParams.set("page", 0);
          setSearchParams(searchParams);
        }}
      />
      <h1> </h1>
      <Grid container spacing={3}>
        {loading && !initialFetchDone ? (
          <Typography
            variant="h4"
            color="secondary"
            sx={{ textAlign: "center", paddingTop: "20px" }}
          >
            Loading...
          </Typography>
        ) : products.length > 0 ? (
          products.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Paper
                key={item.id}
                elevation={3}
                style={{
                  padding: "10px",
                  margin: "10px",
                  backgroundColor: "rgba(0,0,0,0)",
                  boxShadow: "none",
                }}
              >
                <ProductItem
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h4"
            color="secondary"
            sx={{ textAlign: "center", paddingTop: "20px" }}
          >
            No Products Found
          </Typography>
        )}
      </Grid>

      <Grid>
        {!loading && products.length ? (
          <TablePagination
            style={{ color: "#323031" }}
            component="div"
            count={totalProduct || 100}
            page={page || 0}
            onPageChange={handleChangePage}
            rowsPerPage={+rowsPerPage || 10}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : null}
      </Grid>
    </div>
  );
};
