--插入公司信息
Insert into TRAIN_CORP
   (CODE, NAME, PIN_YIN)
 Values
   ('558', '信息通信公司', 'xxtxgs');

--职位表
create table V_POST (POST_COD varchar(10) ,POST varchar(20),POST_TYP_COD varchar(1),primary key (POST_COD));

Insert into V_POST
   (POST_COD, POST, POST_TYP_COD)
 Values
   ('05031210', '技术员', '0');
Insert into V_POST
   (POST_COD, POST, POST_TYP_COD)
 Values
   ('050506', '软件管理员', '0');
   
COMMIT;

--部门信息
Insert into C_DEPT
   (DEPT_COD, BANK_COD, BANK_NO, CORP_COD, DEPT_NAM, DEPT_SORT)
 Values
   ('558010', '01', '00075', '558', '信息部', '1');
COMMIT;

--职级表
Insert into V_BUSI_LEVEL
   (BUSI_LEVEL_COD, BUSI_LEVEL, BUSI_LEVEL_ID, ENJOY_POST_COD)
 Values
   ('1', '局级', '0', '999');
Insert into V_BUSI_LEVEL
   (BUSI_LEVEL_COD, BUSI_LEVEL, BUSI_LEVEL_ID, ENJOY_POST_COD)
 Values
   ('2', '副局级', '0', '989');
Insert into V_BUSI_LEVEL
   (BUSI_LEVEL_COD, BUSI_LEVEL, BUSI_LEVEL_ID, ENJOY_POST_COD)
 Values
   ('3', '正处级', '0', '969');
Insert into V_BUSI_LEVEL
   (BUSI_LEVEL_COD, BUSI_LEVEL, BUSI_LEVEL_ID, ENJOY_POST_COD)
 Values
   ('4', '副处级', '0', '959');
Insert into V_BUSI_LEVEL
   (BUSI_LEVEL_COD, BUSI_LEVEL, BUSI_LEVEL_ID, ENJOY_POST_COD)
 Values
   ('5', '正科级', '0', '949');
Insert into V_BUSI_LEVEL
   (BUSI_LEVEL_COD, BUSI_LEVEL, BUSI_LEVEL_ID, ENJOY_POST_COD)
 Values
   ('6', '副科级', '0', '939');
Insert into V_BUSI_LEVEL
   (BUSI_LEVEL_COD)
 Values
   ('99');
COMMIT;

--操作日志
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'save_plan', '编辑培训计划');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'apply_plan', '申请培训计划');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'reject_plan', '拒绝培训计划');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'save_grade', '编辑培训班级');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'agree_plan', '培训计划申请通过');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'apply_grade', '申请培训班级');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'reject_grade', '班级申请被拒绝');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'agree_grade', '培训班级申请通过');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'save_fee', '编辑培训费用');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'apply_fee', '申请培训费用');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'reject_fee', '培训费用申请被拒绝');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'agree_fee', '培训费用申请通过');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'create_plan', '创建培训计划');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'save_certificate', '保存其他(各类证书等)培训');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'apply_certificate', '申请其他(各类证书等)培训');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'agree_certificate', '通过其他(各类证书等)培训');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ( 'reject_certificate', '拒绝其他(各类证书等)培训');
Insert into OPERATION_INFO
   (CODE, INFO)
 Values
   ('create_certificate', '创建其他(各类证书等)培训');
COMMIT;


