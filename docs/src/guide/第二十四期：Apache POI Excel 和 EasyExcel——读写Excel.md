# Apache POI 和 EasyExcel

## 应用场景

1、将数据库中信息导出为Excel表格

2、将Excel表格中数据录入到数据库

## Apache POI

Apache POI官网：https://poi.apache.org/

百度搜索一下Apache POI的词条，专门用来对 Microsoft Office 进行读写的，我们这里只讲关于Excel的功能，也就是XSSF和HSSF这两个类

[![T6ONcj.png](https://s4.ax1x.com/2021/12/29/T6ONcj.png)](https://imgtu.com/i/T6ONcj)

[![T6Oc34.png](https://s4.ax1x.com/2021/12/29/T6Oc34.png)](https://imgtu.com/i/T6Oc34)

## Excel的版本

Excel分为两个版本，03版本，以及07版本，分别以xls和xlsx作为文件后缀

xls的文件，行数上限为65536行，列数上限256列，而xlsx文件上限为1048576行，列数上限16384列

## EasyExcel

阿里开源的excel处理工具，简单、节约内存

EasyExcel地址：https://github.com/alibaba/easyexcel

Java解析、生成Excel比较有名的框架有Apache poi、jxl。但他们都存在一个严重的问题就是非常的耗内存，poi有一套SAX模式的API可以一定程度的解决一些内存溢出的问题，但POI还是有一些缺陷，比如07版Excel解压缩以及解压后存储都是在内存中完成的，内存消耗依然很大。easyexcel重写了poi对07版Excel的解析，一个3M的excel用POI sax解析依然需要100M左右内存，改用easyexcel可以降低到几M，并且再大的excel也不会出现内存溢出；03版依赖POI的sax模式，在上层做了模型转换的封装，让使用者更加简单方便

虽然POI是目前使用最多的用来做excel解析的框架，但这个框架并不那么完美。大部分使用POI都是使用他的userModel模式。userModel的好处是上手容易使用简单，随便拷贝个代码跑一下，剩下就是写业务转换了，虽然转换也要写上百行代码，相对比较好理解。然而userModel模式最大的问题是在于非常大的内存消耗，一个几兆的文件解析要用掉上百兆的内存。现在很多应用采用这种模式，之所以还正常在跑一定是并发不大，并发上来后一定会OOM或者频繁的full gc。

## 核心原理

写有大量数据的xlsx文件时，POI为我们提供了SXSSFWorkBook类来处理，这个类的处理机制是当内存中的数据条数达到一个极限数量的时候就flush这部分数据，再依次处理余下的数据，这个在大多数场景能够满足需求。

读有大量数据的文件时，使用WorkBook处理就不行了，因为POI对文件是先将文件中的cell读入内存，生成一个树的结构（针对Excel中的每个sheet，使用TreeMap存储sheet中的行）。如果数据量比较大，则同样会产生java.lang.OutOfMemoryError: Java heap space错误。POI官方推荐使用“XSSF and SAX（event API）”方式来解决。

分析清楚POI后要解决OOM有3个关键。

### 1、文件解压文件读取通过文件形式

[![Tjm6Yt.png](https://s4.ax1x.com/2022/01/05/Tjm6Yt.png)](https://imgtu.com/i/Tjm6Yt)

### 2、避免将全部全部数据一次加载到内存

采用sax模式一行一行解析，并将一行的解析结果以观察者的模式通知处理。

[![TjmLlT.png](https://s4.ax1x.com/2022/01/05/TjmLlT.png)](https://imgtu.com/i/TjmLlT)

### 3、抛弃不重要的数据

Excel解析时候会包含样式，字体，宽度等数据，但这些数据是我们不关心的，如果将这部分数据抛弃可以大大降低内存使用。Excel中数据如下Style占了相当大的空间。

### 注意：

因为EasyExcel做了优化，所以Excel的读写，没有任何关于样式的操作

## JExcelApi（JXL）

这个已经不更新了，作为了解吧

JXL官网：http://jexcelapi.sourceforge.net/

## POI-Excel写

写一下Maven的pom依赖

### pom依赖

```xml
    <dependencies>
        <!--  xls(03)  -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>3.9</version>
        </dependency>
        <!--  xlsx(07)  -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>3.9</version>
        </dependency>
        <!--  日期格式化工具  -->
        <dependency>
            <groupId>joda-time</groupId>
            <artifactId>joda-time</artifactId>
            <version>2.10.1</version>
        </dependency>
        <!--  test  -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
        </dependency>
    </dependencies>
```

### java中的对象

java是面向对象的编程语言，所以Excel中进行的操作都可以用对象来控制

主要有：工作簿、工作表、行、列、单元格五个对象

[![TcH6Dx.png](https://s4.ax1x.com/2021/12/29/TcH6Dx.png)](https://imgtu.com/i/TcH6Dx)

### Workbook

Workbook是POI提供的，它有有三个实现类

HSSF、XSSF、SXSSF，分别对应xls的文件操作，xlsx文件的操作，以及读xlsx文件的优化操作

[![TcLP4U.png](https://s4.ax1x.com/2021/12/29/TcLP4U.png)](https://imgtu.com/i/TcLP4U)

### 导入少量数据

我们先入门一下如何写入数据

#### 03xls

```java
    String PATH = "D:\\Ancestors\\ResourceWeb\\excel\\";
    @Test
    public void testWrite03() throws IOException {
        //创建一个工作簿
        Workbook workbook = new HSSFWorkbook();
        //创建工作表
        Sheet sheet = workbook.createSheet("uino小学统计表");
        //创建行(第一行)
        Row row1 = sheet.createRow(0);
        //创建第一个单元格(0,0)
        Cell cell1 = row1.createCell(0);
        cell1.setCellValue("姓名");
        //创建第二个单元格(0,1)
        Cell cell2 = row1.createCell(1);
        cell2.setCellValue("学分");
        //创建行(第二行)
        Row row2 = sheet.createRow(1);
        Cell cell3 = row2.createCell(0);
        //(1,0)
        cell3.setCellValue("李泽辉");
        Cell cell4 = row2.createCell(1);
        //(1,1)
        cell4.setCellValue("40");

        //生成一张表
        FileOutputStream fileOutputStream = new FileOutputStream(PATH+"uino小学统计表-03输出.xls");
        //写入
        workbook.write(fileOutputStream);
        //关闭
        fileOutputStream.close();
    }
```

#### 07xlsx

只需要把输出流文件的文件后缀改一下，然后把`HSSFWorkbook()`改为`XSSFWorkbook()`就可以了

```java
    /**
     * 07写入
     * @throws IOException
     */
    @Test
    public void testWrite07() throws IOException {
        //创建一个工作簿
        Workbook workbook = new XSSFWorkbook();
        //创建工作表
        Sheet sheet = workbook.createSheet("uino小学统计表");
        //创建行(第一行)
        Row row1 = sheet.createRow(0);
        //创建第一个单元格(0,0)
        Cell cell1 = row1.createCell(0);
        cell1.setCellValue("姓名");
        //创建第二个单元格(0,1)
        Cell cell2 = row1.createCell(1);
        cell2.setCellValue("学分");
        //创建行(第二行)
        Row row2 = sheet.createRow(1);
        Cell cell3 = row2.createCell(0);
        //(1,0)
        cell3.setCellValue("李泽辉");
        Cell cell4 = row2.createCell(1);
        //(1,1)
        cell4.setCellValue("40");

        //生成一张表
        FileOutputStream fileOutputStream = new FileOutputStream(PATH+"uino小学统计表-07输出.xlsx");
        //写入
        workbook.write(fileOutputStream);
        //关闭
        fileOutputStream.close();
    }
```

### 数据批量导入

#### 03xls（HSSF）

上面是基本的，现在我们用for循环来写入数据

```java
    @Test
    public  void  testWrite03BigData() throws IOException {
        //初始时间
        long begin = System.currentTimeMillis();

        //创建单元簿
        Workbook workbook = new HSSFWorkbook();

        //创建表
        Sheet sheet = workbook.createSheet();

        //生成数据
        for(int rowNum = 0; rowNum < 65536; rowNum++){
            Row row = sheet.createRow(rowNum);
            for(int cellNum = 0; cellNum < 10; cellNum++){
                Cell cell = row.createCell(cellNum);
                cell.setCellValue(cellNum);
            }
        }

        //生成文件
        FileOutputStream fileOutputStream = new FileOutputStream(PATH+"03大数据输入.xls");
        workbook.write(fileOutputStream);
        fileOutputStream.close();

        //结束时间
        long end = System.currentTimeMillis();

        //数据插入时间
        System.out.println( (double)(end - begin) / 1000);
    }
```

#### 07xlsx（XSSF）

我们在xlsx文件尝试写入10w条数据

```java
    /**
     * 07大数据写入
     */
    @Test
    public  void  testWrite07BigData() throws IOException {
        //初始时间
        long begin = System.currentTimeMillis();

        //创建单元簿
        Workbook workbook = new XSSFWorkbook();

        //创建表
        Sheet sheet = workbook.createSheet();

        //生成数据
        for(int rowNum = 0; rowNum < 100000; rowNum++){
            Row row = sheet.createRow(rowNum);
            for(int cellNum = 0; cellNum < 10; cellNum++){
                Cell cell = row.createCell(cellNum);
                cell.setCellValue(cellNum);
            }
        }

        //生成文件
        FileOutputStream fileOutputStream = new FileOutputStream(PATH+"07大数据输入.xlsx");
        workbook.write(fileOutputStream);
        fileOutputStream.close();

        //结束时间
        long end = System.currentTimeMillis();

        //数据插入时间
        System.out.println( (double)(end - begin) / 1000);
    }
```

测试完时间约为7s

#### 07xlsx（SXSSF）

内存占用比XSSF少，速度快

会产生临时文件

原理：默认100条（可以通过new SXSSFWorkbook(数量)自定义上限）记录保存到内存，超过这个数量，把这100条放入临时文件，然后临时文件转换为xlsx

```java
    /**
     * 07大数据写入SXSSF
     */
    @Test
    public  void  testWrite07BigDataS() throws IOException {
        //初始时间
        long begin = System.currentTimeMillis();

        //创建单元簿
        Workbook workbook = new SXSSFWorkbook();

        //创建表
        Sheet sheet = workbook.createSheet();

        //生成数据
        for(int rowNum = 0; rowNum < 100000; rowNum++){
            Row row = sheet.createRow(rowNum);
            for(int cellNum = 0; cellNum < 10; cellNum++){
                Cell cell = row.createCell(cellNum);
                cell.setCellValue(cellNum);
            }
        }

        //生成文件
        FileOutputStream fileOutputStream = new FileOutputStream(PATH+"07大数据输入S.xlsx");
        workbook.write(fileOutputStream);
        fileOutputStream.close();
        //会生成临时文件,清掉
        ((SXSSFWorkbook)workbook).dispose();

        //结束时间
        long end = System.currentTimeMillis();

        //数据插入时间
        System.out.println( (double)(end - begin) / 1000);
    }
```

POI提供了SXSSF作为写xlsx文件的优化类，我们再次尝试写入10w条数据

约为2s

## POI-Excel读

注意单元格类型：获取字符串和数字是两个方法

### 03xls（HSSF）

```java
    /**
     * 03读取
     * @throws IOException
     */
    @Test
    public void testRead03() throws IOException {

        //获取文件流
        FileInputStream fileInputStream = new FileInputStream(PATH+"uino小学统计表-03输出.xls");

        //拿到工作簿
        Workbook workbook = new HSSFWorkbook(fileInputStream);

        //拿到下表0的工作表
        Sheet sheet = workbook.getSheetAt(0);

        //拿到行
        Row row = sheet.getRow(0);

        //拿到列
        Cell cell = row.getCell(0);
        System.out.println(cell.getStringCellValue());

////        注意类型
//        Row row = sheet.getRow(1);
//        Cell cell = row.getCell(1);
//        System.out.println(cell.getNumericCellValue());

        //关闭流
        fileInputStream.close();
    }
```

### 07xlsx（XSSF）

```java
    /**
     * 07读取
     * @throws IOException
     */
    @Test
    public void testRead07() throws IOException {

        //获取文件流
        FileInputStream fileInputStream = new FileInputStream(PATH+"uino小学统计表-07输出.xlsx");

        //拿到工作簿
        Workbook workbook = new XSSFWorkbook(fileInputStream);

        //拿到下表0的工作表
        Sheet sheet = workbook.getSheetAt(0);

        //拿到行
        Row row = sheet.getRow(0);

        //拿到列
        Cell cell = row.getCell(0);
        System.out.println(cell.getStringCellValue());

////        注意类型
//        Row row = sheet.getRow(1);
//        Cell cell = row.getCell(1);
//        System.out.println(cell.getNumericCellValue());

        //关闭流
        fileInputStream.close();
    }
```

### 例子

我们来尝试读取一下这个文件

[![Tj1NEF.png](https://s4.ax1x.com/2022/01/05/Tj1NEF.png)](https://imgtu.com/i/Tj1NEF)

```java
    /**
     * 明细表读取
     * @throws IOException
     */
    @Test
    public void testReadType() throws IOException {

        //获取文件流
        FileInputStream fileInputStream = new FileInputStream(PATH+"明细表.xls");

        //拿到工作簿
        Workbook workbook = new HSSFWorkbook(fileInputStream);

        //拿到下表0的工作表
        Sheet sheet = workbook.getSheetAt(0);

        //获取标题
        Row rowTitle = sheet.getRow(0);
        if(rowTitle != null){
            //拿到标题行的个数
            int cellCount = rowTitle.getPhysicalNumberOfCells();
            for (int cellNum = 0; cellNum < cellCount; cellNum++){
                //拿到每一个单元格
                Cell cell = rowTitle.getCell(cellNum);
                if(cell != null){
                    //单元格的值
                    String cellValue = cell.getStringCellValue();
                    System.out.print(cellValue+" | ");
                }
            }
        }
        System.out.println();

        //获取除了标题的数据
        //行数
        int rowCount = sheet.getPhysicalNumberOfRows();
        for(int rowNum = 1; rowNum < rowCount; rowNum++){
            //拿到行数据
            Row rowData = sheet.getRow(rowNum);
            if(rowData != null){
                //单元格数量
                int cellCount = rowTitle.getPhysicalNumberOfCells();
                for(int cellNum = 0; cellNum < cellCount; cellNum++){
                    Cell cell = rowData.getCell(cellNum);
                    //匹配数据类型
                    try{ //单元格数据类型
                        int cellType = cell.getCellType();
                        String cellValue = "";
                        switch (cellType){
                            case HSSFCell.CELL_TYPE_STRING://字符串
                                cellValue = cell.getStringCellValue();
                                break;
                            case HSSFCell.CELL_TYPE_BOOLEAN://布尔
                                cellValue = String.valueOf(cell.getBooleanCellValue());
                                break;
                            case HSSFCell.CELL_TYPE_BLANK://空
                                cellValue = "NULL";
                                break;
                            case HSSFCell.CELL_TYPE_NUMERIC://数字（日期、普通数字）
                                if(HSSFDateUtil.isCellDateFormatted(cell)){//日期
                                    Date date = cell.getDateCellValue();
                                    cellValue = new DateTime(date).toString("yyyy-MM-dd");
                                }else {
                                    cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                                    cellValue = cell.toString();
                                }
                                break;
                            case HSSFCell.CELL_TYPE_ERROR://错误
                                cellValue = "ERROR";
                                break;
                        }
                        System.out.print(cellValue+" | ");
                    }catch (Exception e){
                        System.out.print("NULL"+" | ");
                    }


                }
                System.out.println();
            }
        }

    }
```

## 计算公式

[![Tj3GRA.png](https://s4.ax1x.com/2022/01/05/Tj3GRA.png)](https://imgtu.com/i/Tj3GRA)

直接获取单元格，会显示公式

```java
    /**
     * 计算公式
     */
    @Test
    public void  testFormula() throws IOException {
        //获取文件流
        FileInputStream fileInputStream = new FileInputStream(PATH+"公式表.xls");

        //拿到工作簿
        Workbook workbook = new HSSFWorkbook(fileInputStream);

        //拿到下表0的工作表
        Sheet sheet = workbook.getSheetAt(0);

        //拿到行
        Row row = sheet.getRow(4);

        //拿到列
        Cell cell = row.getCell(0);
        System.out.println(cell);
        System.out.println(cell.getCellType());
    }
```

我们需要公式转换为数值显示

```java
    /**
     * 计算公式
     */
    @Test
    public void  testFormula() throws IOException {
        //获取文件流
        FileInputStream fileInputStream = new FileInputStream(PATH+"公式表.xls");

        //拿到工作簿
        Workbook workbook = new HSSFWorkbook(fileInputStream);

        //拿到下表0的工作表
        Sheet sheet = workbook.getSheetAt(0);

        //拿到行
        Row row = sheet.getRow(4);

        //拿到列
        Cell cell = row.getCell(0);

        //拿到计算公式
        FormulaEvaluator formulaEvaluator = new HSSFFormulaEvaluator((HSSFWorkbook)workbook);

        int cellType = cell.getCellType();

        switch (cellType){
            case Cell.CELL_TYPE_FORMULA://公式
                //计算
                CellValue evaluate = formulaEvaluator.evaluate(cell);
                System.out.println(evaluate.formatAsString());
                break;
        }
    }
```

## EasyExcel

导入Maven依赖

### pom.xml

```java
    <dependencies>
        <!--  EasyExcel  -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>easyexcel</artifactId>
            <version>3.0.5</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>4.1.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>4.1.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml-schemas</artifactId>
            <version>4.1.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-csv</artifactId>
            <version>1.8</version>
        </dependency>
        <dependency>
            <groupId>cglib</groupId>
            <artifactId>cglib</artifactId>
            <version>3.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>
        <dependency>
            <groupId>org.ehcache</groupId>
            <artifactId>ehcache</artifactId>
            <version>3.8.1</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
            <scope>provided</scope>
        </dependency>

        <!--test-->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.5</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.78</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot</artifactId>
            <version>2.5.4</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.5.4</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>RELEASE</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
```

### 写入

#### Dao

```java
package com.uino.easyExcel;



import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode
public class DemoData {
    @ExcelProperty("字符串标题")
    private String string;
    @ExcelProperty("日期标题")
    private Date date;
    @ExcelProperty("数字标题")
    private Double doubleData;
    /**
     * 忽略这个字段
     */
    @ExcelIgnore
    private String ignore;
}
```



#### EasyTest.java

```java
package com.uino.easyExcel;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.util.ListUtils;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.List;

public class EasyTest {

    /**
     * 输出文件路径
     */
    String PATH = "D:\\Ancestors\\ResourceWeb\\excel\\";

    private List<DemoData> data() {
        List<DemoData> list = ListUtils.newArrayList();
        for (int i = 0; i < 10; i++) {
            DemoData data = new DemoData();
            data.setString("字符串" + i);
            data.setDate(new Date());
            data.setDoubleData(0.56);
            list.add(data);
        }
        return list;
    }

    /**
     * 最简单的写
     * <p>
     * 1. 创建excel对应的实体对象 参照{@link DemoData}
     * <p>
     * 2. 直接写即可
     */
    @Test
    public void simpleWrite() {
        String fileName = PATH +"EasyTest.xlsx";
        EasyExcel.write(fileName, DemoData.class).sheet("模板").doWrite(data());
    }
}

```

### 读取

#### 持久化操作

```java
package com.uino.easyExcel.read;

import com.uino.easyExcel.write.DemoData;

import java.util.List;

/**
 * 假设这个是你的DAO存储。当然还要这个类让spring管理，当然你不用需要存储，也不需要这个类。
 **/
public class DemoDAO {
    public void save(List<DemoData> list) {
        // 如果是mybatis,尽量别直接调用多次insert,自己写一个mapper里面新增一个方法batchInsert,所有数据一次性插入
    }
}

```

#### 监听器

```java
package com.uino.easyExcel.read;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.read.listener.ReadListener;
import com.alibaba.excel.util.ListUtils;
import com.alibaba.fastjson.JSON;
import com.uino.easyExcel.write.DemoData;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

// 有个很重要的点 DemoDataListener 不能被spring管理，要每次读取excel都要new,然后里面用到spring可以构造方法传进去
@Slf4j
public class DemoDataListener implements ReadListener<DemoData> {

    /**
     * 每隔5条存储数据库，实际使用中可以100条，然后清理list ，方便内存回收
     */
    private static final int BATCH_COUNT = 100;
    /**
     * 缓存的数据
     */
    private List<DemoData> cachedDataList = ListUtils.newArrayListWithExpectedSize(BATCH_COUNT);
    /**
     * 假设这个是一个DAO，当然有业务逻辑这个也可以是一个service。当然如果不用存储这个对象没用。
     */
    private DemoDAO demoDAO;

    public DemoDataListener() {
        // 这里是demo，所以随便new一个。实际使用如果到了spring,请使用下面的有参构造函数
        demoDAO = new DemoDAO();
    }

    /**
     * 如果使用了spring,请使用这个构造方法。每次创建Listener的时候需要把spring管理的类传进来
     *
     * @param demoDAO
     */
    public DemoDataListener(DemoDAO demoDAO) {
        this.demoDAO = demoDAO;
    }

    /**
     * 这个每一条数据解析都会来调用
     *
     * @param data    one row value. Is is same as {@link AnalysisContext#readRowHolder()}
     * @param context
     */
    @Override
    public void invoke(DemoData data, AnalysisContext context) {
        log.info("解析到一条数据:{}", JSON.toJSONString(data));
        cachedDataList.add(data);
        // 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM
        if (cachedDataList.size() >= BATCH_COUNT) {
            saveData();
            // 存储完成清理 list
            cachedDataList = ListUtils.newArrayListWithExpectedSize(BATCH_COUNT);
        }
    }

    /**
     * 所有数据解析完成了 都会来调用
     *
     * @param context
     */
    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        // 这里也要保存数据，确保最后遗留的数据也存储到数据库
        saveData();
        log.info("所有数据解析完成！");
    }

    /**
     * 加上存储数据库
     */
    private void saveData() {
        log.info("{}条数据，开始存储数据库！", cachedDataList.size());
        demoDAO.save(cachedDataList);
        log.info("存储数据库成功！");
    }
}
```

#### 测试

```java
package com.uino.easyExcel.read;

import com.alibaba.excel.EasyExcel;
import com.uino.easyExcel.write.DemoData;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class EasyTest2 {
    /**
     * 输出文件路径
     */
    String PATH = "D:\\Ancestors\\ResourceWeb\\excel\\";
    // 写法1：JDK8+ ,不用额外写一个DemoDataListener
    // since: 3.0.0-beta1
    @Test
    public void simpleRead() {
        String fileName = PATH + "EasyTest.xlsx";

        EasyExcel.read(fileName, DemoData.class,new DemoDataListener()).sheet().doRead();

    }

}

```

















