package com.example.demo;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.RequestPredicates.OPTIONS;

@Configuration
public class RouteHelper {

    // ✅ CORS Config
    @Bean
    CorsWebFilter corsWebFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // React frontend
        config.addAllowedHeader("*");   // allow all headers
        config.addAllowedMethod("*");   // allow all HTTP methods
        config.addExposedHeader("Authorization"); // expose auth token if needed

        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }

    // ✅ Handle Preflight OPTIONS requests
    @Bean
    public RouterFunction<ServerResponse> corsRouterFunction() {
        return route(OPTIONS("/**"), req -> ServerResponse.ok().build());
    }

    // ✅ Routes
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("CustomerService", r -> r.path("/api/**")
               .uri("http://localhost:8081"))
            //.uri("lb://CustomerService"))
            .route("KitchenStaffService", r -> r.path("/api2/**")
                .uri("http://localhost:8083"))
            //.uri("lb://KitchenStaffService"))
            .route("restaurant_management_system_spring_boot", r -> r.path("/api1/**")
                .uri("http://localhost:8082"))
           // .uri("lb://restaurant_management_system_spring_boot"))
            .route("ManagerService", r -> r.path("/api3/**")
                .uri("http://localhost:8084"))
           // .uri("lb://ManagerService"))
            .build();
    }
}

