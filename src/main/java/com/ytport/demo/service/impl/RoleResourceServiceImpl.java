package com.ytport.demo.service.impl;


import com.ytport.base.service.impl.BaseServiceImpl;
import com.ytport.demo.dao.RoleResourceDao;
import com.ytport.demo.dao.jdbc.RoleResourceJdbcDao;
import com.ytport.demo.entity.RoleResource;
import com.ytport.demo.service.RoleResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.PropertyFilter;

import java.util.List;

@Component
@Transactional(readOnly = true)
public class RoleResourceServiceImpl extends BaseServiceImpl<RoleResource, String> implements RoleResourceService {

    private static Logger logger = LoggerFactory.getLogger(RoleResourceServiceImpl.class);

    private RoleResourceDao baseDao;

    @Autowired
    private RoleResourceJdbcDao roleResourceJdbcDao;

    @Autowired
    public void setBaseDao(RoleResourceDao value) {
        super.setBaseDao(value);
        baseDao = value;
    }

    @Override
    public String hql() {
        return "select entity from UserRole entity left join fetch entity.role role" +
                " left join fetch role.resources resource where {where}";
    }

    @Override
    public List<RoleResource> search(List<PropertyFilter> filters) {

        String sql="select distinct YTG_RESOURCE.* from YTG_ROLE_RESOURCE entity ,YTG_RESOURCE  WHERE entity.RESOURCE_ID=YTG_RESOURCE.ID AND {where}";
        return roleResourceJdbcDao.search(sql,filters);
    }
}

