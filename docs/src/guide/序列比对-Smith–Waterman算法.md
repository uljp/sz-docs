## 算法简介

Smith-Waterman算法是一种进行局部序列比对（相对于全局比对）的算法，用于找出两个核苷酸序列或蛋白质序列之间的相似区域。该算法的目的不是进行全序列的比对，而是找出两个序列中具有高相似度的片段。以下面的例子来说明该算法的功能。

问题：  
找出字符串“TGTTACGG”和字符串“GGTTGACTA”的相似子串。

解：

```
TG“TT AC”GG
GG“TTGAC”TA
引号内部分就是两字符串中的各自相似子串
```

### 算法历史及演进

该算法由坦普尔·史密斯（Temple F. Smith）和迈克尔·沃特曼（Michael S. Waterman）于1981年提出。Smith-Waterman算法是Needleman-Wunsch算法的一个变体，二者都是动态规划算法。后来常用的序列比对算法例如FASTA和大名鼎鼎的BLAST也是基于这个算法改进的。

## 算法过程

Smith-Waterman算法分为两个步骤。  
步骤1：通过两字符串构建“惩罚得分矩阵”。  
步骤2：通过回溯“惩罚得分矩阵”以定位两字符串中的相似子串部分。

### 构建惩罚得分矩阵

以字符串“TGTTACGG”和“GGTTGACTA”为例，构建“惩罚得分矩阵”。

步骤1.1：通过两字符串长度生成一个(m+1)\*(n+1)的二维矩阵，并初始化第一行和第一列的分数为零。  
![](https://pan.udolphin.com/files/image/2021/9/fdc85fd8d9320d575ede48bdd96bcf26.jpg)

步骤1.2：逐行确定无得分格子的分数。  
步骤1.2.1：分数由该格子“左上”、“上”、“左”三个相邻格子的分数共同决定。如果该格子对应的两字符串中字符相同时，“左上”方向的分数为“左上”分数+3；反之为“左上”分数-3。  
![](https://pan.udolphin.com/files/image/2021/9/6e33d1215d245827f6e82b39fe75820a.jpg)![](https://pan.udolphin.com/files/image/2021/9/44e22b9b3828c06c718cd3ebc4be0388.jpg)

步骤1.2.2：“上”和“左”方向的分数为各自分数-2。  
![](https://pan.udolphin.com/files/image/2021/9/0ca4378347eaf6b89a4caaccf41f5dee.jpg)  
这样三个方向的分数就都有了。  
![](https://pan.udolphin.com/files/image/2021/9/712652e77829d9ba14df3a2075d9ddf7.jpg)

步骤1.2.3：取这三个方向分数的最大值为该格子的分数。  
![](https://pan.udolphin.com/files/image/2021/9/6399d75930b761566fb00dd3d5429404.jpg)

步骤1.2.4：如果该分数为负，则该分数为零。  
![](https://pan.udolphin.com/files/image/2021/9/9e541675a6ed93e1e10d8239f81aecd9.jpg)

按如上步骤就可以构建完“惩罚得分矩阵”。  
![](https://pan.udolphin.com/files/image/2021/9/8b04519447396bd544881858f5975da1.gif)

### 回溯惩罚得分矩阵

我们可以知道“惩罚得分矩阵”的每个非零分数的格子是由哪个相邻格子决定的（来源格子）。  
![](https://pan.udolphin.com/files/image/2021/9/c67a090f20bb1391687aa3faa98b7f08.jpg)

步骤2.1：找到分数最高的那个格子。  
步骤2.2：从分数最高格子开始，从它的“来源格子”中找到最大分数的那个格子，依次回溯到分数为零的格子为止，这样就可以确定x轴方向上的区间和y轴方向上的区间。这两个区间便可以映射到两个字符串的相似子串。  
![](https://pan.udolphin.com/files/image/2021/9/5593d80a35351b94eace1c07c63852c5.jpg)

## 代码实现

### Java实现

```
void smith_waterman(String a, String b) {
    int[][] scoreTable = new int[b.length() + 1][a.length() + 1];
    int[][][][] sourceTable = new int[b.length() + 1][a.length() + 1][3][2];
    // 构建惩罚得分矩阵
    int[][] source_null = new int[][] {new int[] {-1, -1}, new int[] {-1, -1}, new int[] {-1, -1}};
    for (int y = 0; y < b.length(); y++) {
        String letterB = b.substring(y, y + 1);
	for (int x = 0; x < a.length(); x++) {
 	    String letterA = a.substring(x, x + 1);
	    int leftUpScore = scoreTable[y][x] + (letterA.equals(letterB) ? 3 : -3);
	    int upScore = scoreTable[y][x + 1] - 2;
	    int leftScore = scoreTable[y + 1][x] - 2;
	    int score = leftUpScore;
	    int[][] source = new int[][] {new int[] {x, y}, new int[] {-1, -1}, new int[] {-1, -1}};
	    if (upScore == score) {
		source[1] = new int[] {y, x + 1};
	    } else if (upScore > score) {
		score = upScore;
		source = new int[][] {new int[] {-1, -1}, new int[] {y, x + 1}, new int[] {-1, -1}};
	    }
	    if (leftScore == score) {
		source[2] = new int[] {y + 1, x};
	    } else if (leftScore > score) {
		score = leftScore;
		source = new int[][] {new int[] {-1, -1}, new int[] {-1, -1}, new int[] {y + 1, x}};
	    }
	    if (score < 0) {
		score = 0;
		sourceTable[y + 1][x + 1] = source_null;
	    } else {
		sourceTable[y + 1][x + 1] = source;
	    }
	    scoreTable[y + 1][x + 1] = score;
	}
    }
    // 回溯惩罚得分矩阵
    int maxScore = -1;
    int maxX = -1;
    int maxY = -1;
    for (int y = 1; y < scoreTable.length; y++) {
	int[] row = scoreTable[y];
	for (int x = 1; x < row.length; x++) {
	    if (maxScore < 0 || maxScore < row[x]) {
		maxScore = row[x];
		maxX = x;
		maxY = y;
	    }
	}
    }
    if (maxScore > 0) {
	int minX = maxX;
	int minY = maxY;
	while (true) {
	    int maxIndex = -1;
	    int[][] sources = sourceTable[minY][minX];
	    for (int i = 0; i < sources.length; i++) {
		int[] source = sources[i];
		if (source[0] >= 0) {
		    if (maxIndex < 0 || scoreTable[source[1]][source[0]] > scoreTable[sources[maxIndex][1]][sources[maxIndex][0]]) {
			maxIndex = i;
		    }
		}
	    }
	    if (maxIndex >= 0) {
		if (scoreTable[sources[maxIndex][1]][sources[maxIndex][0]] > 0) {
		    minX = sources[maxIndex][0];
		    minY = sources[maxIndex][1];
		} else {
		    break;
		}
	    } else {
		break;
	    }
	}
	System.out.println(a + ": " + a.substring(minX - 1, maxX));
	System.out.println(b + ": " + b.substring(minY - 1, maxY));
    }
}
```

### Javascript实现

```
function smith_waterman(a, b) {
    let scoreTable = new Array();
    let sourceTable = new Object();
    // 构建惩罚得分矩阵
    for (let y = 0; y <= b.length; y++) {
	let row = new Array();
	for (let x = 0; x <= a.length; x++) {
	    row.push(0);
	}
	scoreTable.push(row);
    }
    for (let y = 1; y < scoreTable.length; y++) {
	let letterB = b.substring(y - 1, y);
	for (let x = 1; x < scoreTable[y].length; x++) {
	    let letterA = a.substring(x - 1, x);
	    let leftUpScore = scoreTable[y - 1][x - 1] + (letterA == letterB ? 3 : -3);
	    let upScore = scoreTable[y - 1][x] - 2;
	    let leftScore = scoreTable[y][x - 1] - 2;
	    let score = leftUpScore;
	    let source = [[x - 1, y - 1]];
	    if (upScore == score) {
		source.push([y - 1, x]);
	    } else if (upScore > score) {
		score = upScore;
		source = [[y - 1, x]];
	    }
	    if (leftScore == score) {
		source.push([y, x - 1]);
	    } else if (leftScore > score) {
		score = leftScore;
		source = [[y, x - 1]];
	    }
	    if (score < 0) {
		score = 0;
	    } else {
		sourceTable[x + "_" + y] = source;
	    }
	    scoreTable[y][x] = score;
	}
    }
    // 回溯惩罚得分矩阵
    let maxScore = -1;
    let maxX = -1;
    let maxY = -1;
    for (let y = 1; y < scoreTable.length; y++) {
	for (let x = 1; x < scoreTable[y].length; x++) {
	    if (maxScore < 0 || maxScore < scoreTable[y][x]) {
		maxScore = scoreTable[y][x];
		maxX = x;
		maxY = y;
	    }
	}
    }
    if (maxScore > 0) {
	let minX = maxX;
	let minY = maxY;
	while (true) {
	    if (sourceTable[minX + "_" + minY]) {
		let sources = sourceTable[minX + "_" + minY];
		let maxIndex = 0;
		for (let i = 1; i < sources.length; i++) {
		    if (scoreTable[sources[i][1]][sources[i][0]] > scoreTable[sources[maxIndex][1]][sources[maxIndex][0]]) {
			maxIndex = i;
		    }
		}
		if (scoreTable[sources[maxIndex][1]][sources[maxIndex][0]] > 0) {
		    minX = sources[maxIndex][0];
		    minY = sources[maxIndex][1];
		} else {
		    break;
		}
	    } else {
		break;
	    }
	}
	console.log(a + ": " + a.substring(minX - 1, maxX));
	console.log(b + ": " + b.substring(minY - 1, maxY));
    }
}
```

## 应用场景

Smith-Waterman算法来源于生物工程，所以该算法广泛应用于DNA比对等场景。

在公司产品中也有所使用。比如CMDB产品中，通过系统或业务日志来自动发现CI的过程中也使用了该算法。

再比如WiKi服务中有一项“划词评论”的功能。当读者在某一发布版本的文章中评论了一些词句，但是作者修改了内容生成了新版本的文章，这时候老版本上的评论定位必然会错乱，那么我们使用该算法依然可以帮助老评论定位到新版本文章的正确位置。