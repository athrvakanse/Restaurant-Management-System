package com.example.demo;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class RouteHelper {
	
	@Bean
	CorsWebFilter corsWebFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.setAllowCredentials(true);
	    config.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Ensure it matches your frontend URL
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
<<<<<<< HEAD:src/backend/API_Gateway/src/main/java/com/example/demo/RouteHelper.java
	   // config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    config.setAllowedHeaders(Arrays.asList("*"));
=======
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
>>>>>>> 91d6cdf49b8f0490969d397f235c14af4d26f96f:src/backend/APIGatewayService/src/main/java/com/example/demo/RouteHelper.java
	    config.setExposedHeaders(Arrays.asList("Authorization")); // Expose headers if needed
	    
	    source.registerCorsConfiguration("/**", config);

	    return new CorsWebFilter(source);
	}
<<<<<<< HEAD:src/backend/API_Gateway/src/main/java/com/example/demo/RouteHelper.java
	
	
=======
>>>>>>> 91d6cdf49b8f0490969d397f235c14af4d26f96f:src/backend/APIGatewayService/src/main/java/com/example/demo/RouteHelper.java

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("CustomerService",r->r.path("/api/**")
					.uri("http://localhost:8081"))
//					  .uri("lb://CustomerService"))
				.route("KitchenStaffService",r->r.path("/api2/**")
					//.uri("http://localhost:8083"))
				    .uri("lb://KitchenStaffService"))
<<<<<<< HEAD:src/backend/API_Gateway/src/main/java/com/example/demo/RouteHelper.java
                .route("restaurant_management_system_spring_boot",r->r.path("/api1/**")
					.uri("http://localhost:8082"))
					  //.uri("lb://restaurant_management_system_spring_boot"))
=======
                                .route("restaurant_management_system_spring_boot",r->r.path("/api1/**")
					//.uri("http://localhost:8082"))
					  .uri("lb://restaurant_management_system_spring_boot"))
>>>>>>> 91d6cdf49b8f0490969d397f235c14af4d26f96f:src/backend/APIGatewayService/src/main/java/com/example/demo/RouteHelper.java
                                .route("ManagerService",r->r.path("/api3/**")
					//.uri("http://localhost:8084"))
					  .uri("lb://ManagerService"))
				.build();
		
	}


	

}
