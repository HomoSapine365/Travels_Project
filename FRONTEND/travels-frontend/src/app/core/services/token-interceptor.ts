import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptorFn: HttpInterceptorFn = (req, next) => {
  console.log('Outgoing HTTP:', req.method, req.url); 
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
  }
  return next(req);
};
