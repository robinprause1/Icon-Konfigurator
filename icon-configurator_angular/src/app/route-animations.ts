import {trigger, transition, style, animate, query, animateChild, group, state} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }),
      ], { optional: true }),
      query(':enter', [
        style({ top: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('700ms ease-in-out', style({ }))
        ], { optional: true }),
        query(':enter', [
          animate('700ms ease-in-out', style({ top: '0%' }))
        ], { optional: true }),
      ]),
    ]),
  ]);

