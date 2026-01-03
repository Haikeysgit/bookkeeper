/**
 * JWT Strategy - Auth0 Token Validation
 * 
 * This strategy validates JWT tokens issued by Auth0.
 * It uses JWKS (JSON Web Key Set) to verify token signatures,
 * ensuring only authenticated users can access protected routes.
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Dynamically fetch the signing key from Auth0's JWKS endpoint
            secretOrKeyProvider: passportJwtSecret({
                cache: true,                    // Cache the key to reduce API calls
                rateLimit: true,                // Prevent excessive requests
                jwksRequestsPerMinute: 5,       // Max 5 key fetches per minute
                jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            }),

            // Extract the JWT from the Authorization header (Bearer token)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            // Validate token claims
            audience: process.env.AUTH0_AUDIENCE,  // Must match our API identifier
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,  // Must be from our Auth0 tenant
            algorithms: ['RS256'],  // Auth0 uses RS256 for signing tokens
        });
    }

    /**
     * Called after token validation succeeds.
     * The payload contains user info from the token (sub, email, etc.)
     */
    async validate(payload: any) {
        return payload;
    }
}
