package com.ytport.demo.dao.jdbc;

import com.ytport.base.dao.jdbc.JdbcDao;
import com.ytport.demo.entity.Resource;
import org.springframework.stereotype.Repository;
import org.springside.modules.orm.PropertyFilter;

import java.util.List;

/**
 * 资源 JdbcDao
 * Created by xyl on 15-3-23.
 */
@Repository()
public class ResourceJdbcDao extends JdbcDao<Resource,String> {

        /**
         * 搜索用户具有的资源列表
         * @return
         */
        public List<Resource> searchUserResList(List<PropertyFilter> filters){
        String sql="select id,CODE,NAME,PARENT_ID,PROJECT_CODE,type_Flag,NOTE,SORT," +
                "max(origin) as origin" +
                " from(SELECT ytgResource.id,YTGRESOURCE.CODE,YTGRESOURCE.NAME,YTGRESOURCE.parent_id," +
                "YTGRESOURCE.PROJECT_CODE,YTGRESOURCE.type_Flag,YTGRESOURCE.NOTE,YTGRESOURCE.SORT," +
                "ytgRole.name as origin ,ytgUser.id as user_id " +
                "FROM YTG_USER ytgUser, YTG_USER_ROLE userRole, YTG_ROLE ytgRole, YTG_ROLE_RESOURCE roleResource," +
                " YTG_RESOURCE ytgResource " +
                "WHERE ytgUser.id = userRole.user_id " +
                "    AND userRole.role_id = ytgRole.id " +
                "    AND ytgRole.id = roleResource.role_id " +
                "    AND ROLERESOURCE.RESOURCE_ID = ytgResource.id " +
                "UNION ALL " +
                "(SELECT ytgResource.id,YTGRESOURCE.CODE,YTGRESOURCE.NAME,YTGRESOURCE.parent_id," +
                "YTGRESOURCE.PROJECT_CODE,YTGRESOURCE.type_Flag,YTGRESOURCE.NOTE,YTGRESOURCE.SORT," +
                "'直接授权' as origin ,ytgUser.id as user_id " +
                "FROM YTG_USER ytgUser, YTG_USER_RESOURCE userResource, YTG_RESOURCE ytgResource " +
                "WHERE ytgUser.id = userResource.user_id " +
                "    AND userResource.resource_id = ytgResource.id " +
                "    )) where {where} group by id,CODE,NAME,PARENT_ID,PROJECT_CODE,type_Flag,NOTE,SORT  order by sort asc";
        return this.search(sql, filters);
        }
}
