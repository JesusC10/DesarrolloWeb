import { Badge } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

export default function MyButton(params) {
  return (
    <section>
      <ShoppingCartOutlinedIcon
        value="miValor"
        id="Carrito"
        onClick={(a) => params._handleSelectFromButton(a)}
        style={{ color: "white" }}
        fontSize="large"
      />
      <Badge pill bg="danger">
        {params.nombres.length}
      </Badge>
    </section>
  );
}
