package io.nology.to_do_spring_app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
        String[] allowedOrigins = {
                "http://localhost:5173/",
                "http://127.0.0.1:5173/",
                "https://james-nemeth.github.io/ToDo-App/"
        };
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}