import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../token.service';
import { inject, Injectable } from '@angular/core';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  if (tokenService.hasToken()) {
    const token = tokenService.getToken();
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next(authReq);
  }

  return next(req);
};
