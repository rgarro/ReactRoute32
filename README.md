# ReactRoute32
Simple Reactjs Anchor Location Router, executes callback on location hash change that matches declared routes.

Goodfellas hidding death bodies on evergreen containers. CodeSandbox mobsters...
[![We were Goodfellas!](https://raw.githubusercontent.com/rgarro/ReactRoute32/master/389892.jpg)]

Buy Me a Beer, Starbucks Expresso or send a cheese burguer ... [Paypal](https://www.paypal.me/gospelOfLuke/25).

```html
<ul>
   <li><a class="nav" href="/#/siquirres/">Siquirres</a></li>
   <li><a class="nav" href="/#/guapiles/">Guapiles</a></li>  
</ul>
<script>
import ReactRoute32 from "ReactRoute32";

initRoutes() {
  this.router = new ReactRoute32();
  this.router.add(
    "/#/Siquirres/",
    function() {
      this.setState({ current_route: "SIQUIRRES" });
    }.bind(this)
  );
  this.router.add(
    "/#/Guapiles/",
    function() {
      this.setState({ current_route: "GUAPILES" });
    }.bind(this)
  );
  //dont drink and drive
  this.router.drive();
}

</script>


```
