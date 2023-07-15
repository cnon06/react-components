let p_name = "IPhone 14 er";
let p_price = 45000;

let products = [
  {
    name: "IPhone 15",
    price: 50,
  },
  {
    name: "IPhone 16",
    price: 40,
  },
  {
    name: "IPhone 17",
    price: 40,
  },
  {
    name: "IPhone 18",
    price: 60,
  },
];

let selectedProducts = [];

function formatPrice(price) {
  return price + " TL";
}

function addProduct(event, pName) {
  console.log(event.target, pName);

  if (!selectedProducts.includes(pName)) {
    selectedProducts.push(pName);
  }
  root.render(<App/>);
  // renderApp();
}

function saveProduct(event) {
  event.preventDefault();

  let productName = event.target.elements.p_name.value;
  let productPrice = event.target.elements.p_price.value;
  let product = {
    name: productName,
    price: productPrice,
  };

  products.push(product);
  // renderApp();
  root.render(<App/>);
}

let root = ReactDOM.createRoot(document.getElementById("root"));

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1 id="header">Ürün Listesi</h1>

        <h3>Seçili Ürünler: {selectedProducts.length}</h3>
      </div>
    );
  }
}

class NewProduct extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={saveProduct}>
          <input type="text" name="p_name" id="p_name" />
          <input type="text" name="p_price" id="p_price" />
          <button type="submit">Ürün Ekle</button>
        </form>
      </div>
    );
  }
}

class Product extends React.Component {
  render() {
    return (
      <div className="product-details">
        <h2>{this.props.product.name}</h2>
        {this.props.product.price}
        <button
          type="button"
          onClick={(event) => addProduct(event, this.props.product.name)}
        >
          Ürün Ekle
        </button>
      </div>
    );
  }
}

class ProductList extends React.Component {
  render() {
    return this.props.products.map((product, index) => (
      <Product key={index} product={product} />
    ));
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NewProduct />
        <ProductList products={products} />
      </div>
    );
  }
}

// function renderApp() {
//   let template = (
//     <div>
//       <Header />
//       <NewProduct />
//       <ProductList products={products} />
//     </div>
//   );
//   root.render(template);
// }

// renderApp();

root.render(<App/>);
