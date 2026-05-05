<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests to the following domains will receive stateful API authentication
    | cookies. Typically, these should include your local and production
    | domains which access your application via a frontend SPA.
    |
    */

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,127.0.0.1,127.0.0.1:8000,::1',
        env('APP_URL') ? parse_url(env('APP_URL'), PHP_URL_HOST) : '',
        env('SANCTUM_STATEFUL_DOMAINS') ?: ''
    ))),

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | Here you may specify how long tokens (both the access and refresh
    | tokens) should be allowed to remain valid. These values are
    | expressed in minutes and will be used by the authentication
    | system to calculate when a token expires.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating your first-party SPA with Sanctum you may need
    | to customize some of the middleware Sanctum uses while processing
    | requests. You may change or remove these middleware as you wish.
    |
    */

    'middleware' => [
        'authenticate_session' => Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
        'encrypt_cookies' => Laravel\Sanctum\Http\Middleware\EncryptCookies::class,
        'validate_csrf_token' => Laravel\Sanctum\Http\Middleware\ValidateCsrfToken::class,
    ],

];
