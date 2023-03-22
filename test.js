// function outer() {
//   var a =20;
//  return function inner() {
//     console.log(a);
//   }
//   var a = 10;

// }
// var x = outer();
// console.log(x())

// let a = 0;

// function execute() {
//   if (a === 0) {
//     let a = 1;
//     console.log(a);
//   }
//   console.log(a);
// }
// execute();

// const p = new Promise((res, rej) => {
//   res("done");
// });

// p.finally((msg) => {
//   console.log("first finally block");
//   console.log(msg);
//   return 10;
// })
//   .finally((msg) => {
//     console.log("second finally block");
//     console.log(msg);
//     return 20;
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const arr = [1, 2, 3, 4];

// const newArr = arr.reduce((acc, curr) => {
//   return acc * curr;
// },0);

// console.log("arr:::", arr);

// function sum(x) {
//   return function (y) {
//     if (!y) return x;
//     return sum(x + y);
//   };
// }

// const total = sum(1)(2)(3)();
// console.log(total);

// function sum(x)

// let obj1 = {
//   name: "jay",
// };

// function displayName(age, gender) {
//   console.log(this.name + " " + age, gender);
// }

// console.log(displayName.bind(obj1, [25, "male"]));

// const name = "hema";

// const obj = {
//   name: "jay",
//   getstatus: function () {
//     console.log(this.name);
//   },
// };

// const obj1 = { name: "rahul" };

// console.log(obj.getstatus());//jay
// console.log(obj.getstatus.call(obj1));//rahul

// const arr = [1, 2, 3, 4];

// const finalArr = arr.reduce((acc, cur) => {
//   return acc * cur;
// },0);

// console.log(finalArr);

// let sum1 = function (a) {
//   return function (b) {
//     if (b) {
//       return sum1(a + b);
//     } else {
//       return a;
//     }
//   };
// };

// let addition = (a) =>{

// }

// let sumRecurrsive = sum1(1)(2)(3)(4)();

// function fetchData(url) {
//   return new Promise(function (resolve, reject) {
//     console.log("Started downloading from", url);
//     setTimeout(function processDownloading() {
//       let data = "Dummy data";
//       resolve(data);
//       console.log("Download completed");
//     }, 7000);
//   });
// }

// console.log("Start");
// let promiseObj = fetchData("skfbjkdjbfv");
// promiseObj.then(function A(value) {
//   console.log("value is", value);
// });
// console.log("end");

// var obj1 = {
//   name: "Hema",
//   valueOfThis: function () {
//     return this.name;
//   },
// };
// var obj2 = {
//   name: "Manu",
//   valueOfThis: () => {
//     return this.name;
//   },
// };

// console.log(obj1.valueOfThis());
// console.log(obj2.valueOfThis());

// const names = ["a", "b", "c", "d", "E"];

// function printName(n1, n2, n3, n4) {
//   console.log(n1, n2, n3, n4);
//   // console.log(n);
// }

// printName(...names);

// async function print() {
//   await Array.map(() => {
//     // write your logic here
//   });
// }

// print();

// async function myfunc() {
//   const value = new Promise((res) => {
//     let data = 10;
//     res(data);
//   });

//   let myData = await value;
//   console.log("data::", myData);
//   return myData;
// }
// // let globalData = myfunc();
// console.log("global::", myfunc());
// let myvalue;
// const value = new Promise((res) => {
//   let data = 10;
//   res(data);
// });
// let value1 = value.then((v) => {
//   console.log("v::", v);
//   myvalue = v;
// });
// console.log(myvalue);

// const questions = [
//   {
//     id: 71,
//     text: "hello guys?",
//   },
//   {
//     id: 72,
//     text: "morning All?",
//   },
//   {
//     id: 73,
//     text: "okay",
//   },
//   {
//     id: 74,
//     text: "How?",
//   },
//   {
//     id: 75,
//     text: "How do I ",
//   },
//   {
//     id: 76,
//     text: "How juxs",
//   },
//   {
//     id: 80,
//     text: "",
//   },
//   {
//     id: 81,
//     text: "",
//   },
//   {
//     id: 82,
//     text: "",
//   },
//   {
//     id: 84,
//     text: "",
//   },
// ];

// let totalTexLength = 0;

// questions.map((value) => {
//   if (value?.text?.length)
//     totalTexLength = totalTexLength + value?.text?.length;
// });

// console.log(totalTexLength);

if (true) {
  let a = 10;
  console.log("if::", a);
} else if (true) {
  let a = 10;
  console.log("else if::", a);
}

function testing(){
  
}
