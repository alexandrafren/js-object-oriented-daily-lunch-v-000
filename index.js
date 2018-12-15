// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      function(d){
        return d.neighborhoodId === this.id;
      }.bind(this)
    );
  }
  customers(){
    return store.customers.filter(
      function(c){
        return c.neighborhoodId === this.id;
      }.bind(this)
    );
  }
  meals(){
    let initial = this.deliveries().map(
      function(d){
        return d.meal();
      }
    )
    return Array.from(new Set(initial))
  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      function(d){
        return d.customerId === this.id;
      }.bind(this)
    );
  }
  meals(){
    return this.deliveries().map(
      function(d){
        return d.meal();
      }
    );
  }
  totalSpent(){
    //the 0 in this method sets the initial value of sum to 0
    return this.meals().reduce(
      function(sum, meal){
        return sum + meal.price;
      }, 0);
  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      function(d){
        return d.mealId === this.id;
      }.bind(this)
    );
  }
  customers(){
    //customer doesn't have a mealId, so we need to find another way to ID
    return this.deliveries().map(
      function(d){
        return d.customer();
      }
    );
  }
  static byPrice(){
    return store.meals.sort(
      function(a,b){
        return b.price - a.price;
      }
    )
  }
}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal(){
      return store.meals.find(meal => {
        return meal.id === this.mealId
      })
  }
  customer(){
    return store.customers.find(
      function(c){
        return c.id === this.customerId;
      }.bind(this)
    );
  }
  neighborhood(){
    return store.neighborhoods.find(
      function(n){
        return n.id === this.neighborhoodId;
      }.bind(this)
    );
  }
}
