import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakebakendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/sliders') && method === 'GET':
          return getSliders();
        case url.endsWith('/meals') && method === 'GET':
          return getMeals();
        case url.endsWith('/testimonials') && method === 'GET':
          return getTestimonials();
        case url.endsWith('/burgers') && method === 'GET':
          return getBurgers();
        case url.endsWith('/drinks') && method === 'GET':
          return getDrinks();
        case url.endsWith('/services') && method === 'GET':
          return getServices();
        case url.endsWith('/offers') && method === 'GET':
          return getOffers();
        case url.match(/\/single-product\/\d+$/) && method === 'GET':
          return getProductById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getSliders() {
      return ok(slider);
    }
    function getOffers() {
      return ok(offers);
    }
    function getMeals() {
      return ok(meals);
    }
    function getBurgers() {
      return ok(burger);
    }
    function getDrinks() {
      return ok(drinks);
    }
    function getTestimonials() {
      return ok(testimonial);
    }
    function getServices() {
      return ok(services);
    }

    function getProductById() {
      console.log(".........fvddsfsd........");
      
      const meal = meals.filter((x) => x.id === idFromUrl());
      const bur = burger.filter((x) => x.id === idFromUrl());

      console.log(meal);
      console.log(bur);
      
      if (meal.length>0) {
        return ok(meal);
      }
      if (bur.length>0) {
        return ok(bur);
      }
    
      return ok(null)
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

const slider=[
  {
    img:"assets/img/slider/food1.jpg",
    title:"Best Customer Choice",
    subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit"
  },
  {
    img:"assets/img/slider/food2.jpg",
    title:"Best Customer Choice",
    subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit"
  },
  {
    img:"assets/img/slider/food3.jpg",
    title:"Best Customer Choice",
    subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit"
  },
]
const offers = [
  {
    id: 1,
    discount: 25,
    name: 'Mithi Zuban Home Kitchen',
    description:
    'The menu of Indian and Vegetarian cooking styles is to the delight of all visitors here. ',
    price: 100,
    offer_price: 80,
    img: 'assets/img//food1.jpg',
  },
  {
    id: 2,
    discount: 20,
    name: 'Pizza',
    description:
      'California egg benedict and sauté spinach &mushroom served with avocado',
    price: 150,
    offer_price: 100,
    img: 'assets/img//food2.jpg',  },
  {
    id: 1,
    discount: 15,
    name: 'Chicken Rice',
    description:
      'California egg benedict and sauté spinach &mushroom served with avocado',
    price: 180,
    offer_price: 120,
    img: 'assets/img//food3.jpg',  },
  {
    id: 1,
    discount: 10,
    name: 'Burger',
    description:
      'California egg benedict and sauté spinach &mushroom served with avocado',
    price: 200,
    offer_price: 180,
    img: 'assets/img//food1.jpg',
  },
 
];
const meals = [
  {
    id: 1,
    img: 'assets/img/meals/mithizuban.jpg',
    name: 'Mithi Zuban Home Kitchen',
    description:
      'The menu of Indian and Vegetarian cooking styles is to the delight of all visitors here. At this spot guests can dig profound into tasty dishes, and request well cooked paneer. Most clients demonstrate that the staff is obliging',
    price: 120,
    short:"The menu of Indian and Vegetarian cooking styles",
    mtitle:"Mithi Zuban Home Kitche",
    mkeywords:"Mithi Zuban Home Kitche, Indian and Vegetarian",
    mdescription:"The menu of Indian and Vegetarian cooking styles"
    
  },
  {
    id: 3,
    img: 'assets/img/meals/khaman.jpg',
    name: 'Tiku Khaman House',
    description:
      'Assuming you need to appreciate tremendous help, you should visit this eatery. Various individuals feature that the dishes are presented at reasonable costs. You will like the exquisite climate and excellent.',
    price: 150,
    short:"Assuming you need to appreciate tremendous ",
    mtitle:"Tiku Khaman House",
    mkeywords:"Tiku Khaman Housee, Various individuals feature ",
    mdescription:"Assuming you need to appreciate tremendous help"
  },
  {
    id: 2,
    img: 'assets/img/meals/spicyvila.jpg',
    name: 'Spicyvilla',
    description:
      'The menu of Indian and Vegetarian cooking styles is to the delight of all visitors here. At this spot guests can dig profound into tasty dishes, and request well cooked paneer. Most clients demonstrate that the staff is obliging.',
    price: 180,
    short:'The menu of Indian and Vegetarian cooking styles',
    mtitle:"Spicyvilla",
    mkeywords:"Tiku Khaman Housee,  Indian and Vegetarian ",
    mdescription:"Assuming you need to appreciate tremendous help"
  },
];
const burger = [
  {
    id: 4,
    img: 'http://localhost:4200/assets/img/burger/mix.webp',
    name: 'Mix Meals',
    description:
      'The menu of Indian and Vegetarian cooking styles is to the delight of all visitors here. At this spot guests can dig profound into tasty dishes, and request well cooked paneer. Most clients demonstrate that the staff is obliging',
    price: 120,
    short:'The menu of Indian and Vegetarian cooking styles',
    mtitle:"Mix Mealsa",
    mkeywords:"Mix Mealsa,  Indian and Vegetarian ",
    mdescription:"menu of Indian and Vegetarian cooking styles"

  },
  {
    id: 5,
    img: 'http://localhost:4200/assets/img/burger/family.webp',
    name: 'Family Bundle',
    description:
      'Assuming you need to appreciate tremendous help, you should visit this eatery. Various individuals feature that the dishes are presented at reasonable costs. You will like the exquisite climate and excellent.',
    price: 150,
    short:'The menu of Indian and Vegetarian cooking styles',
    mtitle:"Family Bundle",
    mkeywords:"Family Bundle,  Indian and Vegetarian ",
    mdescription:"menu of Indian and Vegetarian cooking styles"

  },
  {
    id: 6,
    img: 'http://localhost:4200/assets/img/burger/craver.webp',
    name: "Craver",
    description:
      'The menu of Indian and Vegetarian cooking styles is to the delight of all visitors here. At this spot guests can dig profound into tasty dishes, and request well cooked paneer. Most clients demonstrate that the staff is obliging.',
    price: 180,
    short:'The menu of Indian and Vegetarian cooking styles',
    mtitle:"Craver",
    mkeywords:"Craver,  Indian and Vegetarian ",
    mdescription:"menu of Indian and Vegetarian cooking styles"

  },
];
const drinks = [
  {
    id: 7,
    img: 'assets/img/burger/mix.webp',
    name: 'Mix Meals',
    description:
      'The menu of Indian and Vegetarian cooking styles is to the delight of all visitors here. At this spot guests can dig profound into tasty dishes, and request well cooked paneer. Most clients demonstrate that the staff is obliging',
    price: 120,
  },
  {
    id: 8,
    img: 'assets/img/burger/family.webp',
    name: 'Family Bundle',
    description:
      'Assuming you need to appreciate tremendous help, you should visit this eatery. Various individuals feature that the dishes are presented at reasonable costs. You will like the exquisite climate and excellent.',
    price: 150,
  },
  {
    id: 9,
    img: 'assets/img/burger/craver.webp',
    name: "Craver",
    description:
      'The menu of Indian and Vegetarian cooking styles is to the delight of all visitors here. At this spot guests can dig profound into tasty dishes, and request well cooked paneer. Most clients demonstrate that the staff is obliging.',
    price: 180,
  },
];

const services = [
  {
    position:"right",
    img: 'assets/img/deliver-service.jpg',
    title: 'Waiter service ',
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus aperiam minima at vero fuga, corporis, animi iusto possimus sequi nam sit quasi ducimus maiores quas, nisi magni voluptates facere tempore!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam rem ab nemo sint a laboriosam odio laborum! Ex, odit quo fugiat enim quas, ipsa impedit suscipit nemo aliquid quisquam labore. `,
  },
  {
    position:"left",
    img: 'assets/img/service2.jpg',
    title: 'Delivery Service',
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus aperiam minima at vero fuga, corporis, animi iusto possimus sequi nam sit quasi ducimus maiores quas, nisi magni voluptates facere tempore!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus perspiciatis asperiores ratione. Iure sit officiis totam rerum provident cupiditate assumenda minima qui quidem laboriosam, voluptatibus, natus autem. Vero, beatae. `,
  },
];
const testimonial = [
  {
    img: 'http://localhost:4200/assets/img/user-img1.jfif',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dignissimos aperiam dolores vel. Laboriosam, aperiam doloremque. Blanditiis, quas quasi architecto veritatis debitis id culpa sequi ratione minus numquam obcaecati quis.`,
    author: 'jansi dobar ',
  },
  {
    img: 'http://localhost:4200/assets/img/user-img2.jfif',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dignissimos aperiam dolores vel. Laboriosam, aperiam doloremque. Blanditiis, quas quasi architecto veritatis debitis id culpa sequi ratione minus numquam obcaecati quis.`,
    author: 'victor',
  },
  {
    img: 'http://localhost:4200/assets/img/user-img3.jfif',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dignissimos aperiam dolores vel. Laboriosam, aperiam doloremque. Blanditiis, quas quasi architecto veritatis debitis id culpa sequi ratione minus numquam obcaecati quis.`,
    author: 'john',
  },
  {
    img: 'http://localhost:4200/assets/img/user-img4.jfif',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dignissimos aperiam dolores vel. Laboriosam, aperiam doloremque. Blanditiis, quas quasi architecto veritatis debitis id culpa sequi ratione minus numquam obcaecati quis.`,
    author: 'karol',
  },
];

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakebakendInterceptor,
  multi: true,
};
