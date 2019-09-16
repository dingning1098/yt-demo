package com.ytport.demo.service;


import com.ytport.base.service.BaseService;
import com.ytport.demo.entity.Resource;
import com.ytport.demo.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.PropertyFilter;

import java.util.List;

@Component
@Transactional(readOnly = true)
public interface ResourceService extends BaseService<Resource,String>{

    /**
     * 生成所有项目的资源树
     * @param filters
     * @return
     */
    List<Resource> searchAllTree(List<PropertyFilter> filters);

    /**
     * 搜索用户可以进行授权的资源
     * @param user
     * @return
     */
    List<Resource> searchCanAuthorizeResources(User user);

    /**
     * 搜索某一个用户拥有的全部资源。
     * 包括与用户直接关联的资源以及通过角色获取的资源
     * @param user
     * @return
     */
    List<Resource> searchUserResList(String userId);
}

