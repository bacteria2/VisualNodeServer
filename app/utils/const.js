
const createMysqlWidget= `DROP TABLE IF EXISTS ydp_visual_instance;
CREATE TABLE ydp_visual_instance (
    id VARCHAR (255) NOT NULL,
    name VARCHAR (255) DEFAULT '',	
    author VARCHAR (255) DEFAULT '',
    Thumbnail text,
	update_time datetime DEFAULT "2018-01-01 00:00:00",
	script text,
	raw_option text,
	data text,
	data_option text,
	PRIMARY KEY (id)
) ENGINE = INNODB DEFAULT CHARSET = utf8;`;
const insertMysqlWidget='replace into ydp_visual_instance values(?,?,?,?,?,?,?,?,?);';
const deleteOnExistOracle=`
            BEGIN
               EXECUTE IMMEDIATE 'DROP TABLE YDP_VISUAL_INSTANCE';
               EXCEPTION WHEN OTHERS THEN
                      IF SQLCODE <> -942 THEN
                               RAISE;
                      END IF;
            END;`;
const createOracleWidget=`CREATE TABLE "YDP_VISUAL_INSTANCE" (
        "ID" VARCHAR2(255 BYTE) NOT NULL ,
        "NAME" VARCHAR2(255 BYTE) NULL ,
        "AUTHOR" VARCHAR2(255 BYTE) NULL ,
        "THUMBNAIL" CLOB  NULL ,
        "UPDATE_TIME" DATE NOT NULL ,
        "SCRIPT" CLOB NOT NULL ,
        "RAW_OPTION" CLOB  NOT NULL ,
        "DATA" CLOB NOT NULL ,
        "DATA_OPTION" CLOB NOT NULL ,
        PRIMARY KEY ("ID"))`;
const insertOracleWidget='insert into "YDP_VISUAL_INSTANCE" values(:0,:1,:2,:3,:4,:5,:6,:7,:8)';

module.exports={
    createMysqlWidget,insertMysqlWidget,createOracleWidget,insertOracleWidget,deleteOnExistOracle
}