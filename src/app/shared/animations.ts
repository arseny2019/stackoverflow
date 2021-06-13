import { animate, query, sequence, style, transition, trigger } from '@angular/animations';

export const routeAnimationTime = 500;
export const routeAnimationDelay = 200;

export const slideInAnimation =
  trigger('routeAnimation', [
    transition('* <=> *', [
      sequence([
        query(':enter', [
          style({
            display: 'block',
            height: 0,
            opacity: 0
          })
        ], { optional: true }),
        query(':leave', [
          style({
            display: 'block'
          }),
          animate(routeAnimationTime, style({
            opacity: 0
          })),
          style({
            height: 0
          })
        ], { optional: true }),
        query(':enter', [
          style({
            height: 'auto'
          }),
          animate(`${routeAnimationTime}ms ${routeAnimationDelay}ms`, style({
            opacity: 1
          }))
        ], { optional: true })
      ])
    ])
  ]);
