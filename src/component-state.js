let root = ReactDOM.createRoot(document.getElementById("root"));

class User extends React.Component {
  constructor(props) {
    super(props);
    this.changeEmail = this.changeEmail.bind(this); 
    this.state = {
      name: "Sinan ALAGÖZ",
      email: "sinanalagoz74@gmail.com",
    };
  }


changeEmail()
{
    this.state.email = "info@gmail.com"
    console.log(this.state);
   this.setState(
    {
        name: "Kamil SÖNMEZ",
        email: "kml090@yahoo.com",
    }
    );

}

  render() 
  {
    return <div>
        <h2>{this.state.name}</h2>
        <p>{this.state.email}</p>
        <button onClick = {this.changeEmail}>Change Email</button>
    </div>
  }
}

root.render(<User />);
