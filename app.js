const RATE = 10.0;
const MINUTE = 60; // seconds
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;

// returns int as percent
const pct = n => n / 100;

const secondsToDate = _ => {
  const startOfYear = new Date()
  startOfYear.setMonth(0)
  startOfYear.setDate(0)
  startOfYear.setHours(0)
  startOfYear.setMinutes(0)
  startOfYear.setSeconds(0)
  const start = startOfYear.getTime()
  const now = (new Date()).getTime()

  const diff = (now - start) / 1000
  return diff
}
var app = new Vue({
  el: '#app',
  data: {
    investments: 2000,
    income: 45000,
    expenses: 40000,
    growth: 1,
    secondsToDate: secondsToDate(),
    now: new Date().toString()
  },
  computed: {
    value: function () {
      const { investments, income, expenses, secondsToDate } = this;

      const initial = Number(investments);
      const investable = income - expenses;
      const interest = 
      (investable + initial) * pct(RATE);
      const interestPerSecond = interest/YEAR
      
      const static = investable + initial;
      const growth = interestPerSecond * secondsToDate;

      const sum = static + growth
      return sum.toFixed(5);
    },
    investable: function () {
      return this.income - this.expenses;
    },
    currency: function () {
      return String(this.value).slice(0,-3)
    },
    microCurrency: function () {
      return String(this.value).slice(-3)
    }
  },
  methods: {
    clock: function() {
      const SECOND = 1000
      const self = this; // explicit ref to vue
      setInterval(function() {
        self.secondsToDate = secondsToDate()
        self.now = new Date().toString();
      }, SECOND)
    }
  },
  mounted: function () {
    this.clock();
  }
})