package com.apache.fineract.cn.insurance.config;

import io.github.jhipster.config.JHipsterProperties;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.apache.fineract.cn.insurance.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.apache.fineract.cn.insurance.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.apache.fineract.cn.insurance.domain.User.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Authority.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.User.class.getName() + ".authorities");
            createCache(cm, com.apache.fineract.cn.insurance.domain.Customer.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Customer.class.getName() + ".addresses");
            createCache(cm, com.apache.fineract.cn.insurance.domain.Customer.class.getName() + ".policyHolders");
            createCache(cm, com.apache.fineract.cn.insurance.domain.Customer.class.getName() + ".claims");
            createCache(cm, com.apache.fineract.cn.insurance.domain.Address.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Claim.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.PaymentSchedule.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Quote.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Quote.class.getName() + ".products");
            createCache(cm, com.apache.fineract.cn.insurance.domain.Quote.class.getName() + ".policyHolders");
            createCache(cm, com.apache.fineract.cn.insurance.domain.MTA.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Policy.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Policy.class.getName() + ".mTAS");
            createCache(cm, com.apache.fineract.cn.insurance.domain.Policy.class.getName() + ".endorsements");
            createCache(cm, com.apache.fineract.cn.insurance.domain.Policy.class.getName() + ".documents");
            createCache(cm, com.apache.fineract.cn.insurance.domain.Product.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Endorsement.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.Document.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.PolicyHolder.class.getName());
            createCache(cm, com.apache.fineract.cn.insurance.domain.PolicyHolder.class.getName() + ".paymentSchedules");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }
}
