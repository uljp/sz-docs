(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{313:function(t,e,n){"use strict";n.r(e);var r=n(14),a=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"算法简介"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#算法简介"}},[t._v("#")]),t._v(" 算法简介")]),t._v(" "),e("p",[t._v("Smith-Waterman算法是一种进行局部序列比对（相对于全局比对）的算法，用于找出两个核苷酸序列或蛋白质序列之间的相似区域。该算法的目的不是进行全序列的比对，而是找出两个序列中具有高相似度的片段。以下面的例子来说明该算法的功能。")]),t._v(" "),e("p",[t._v("问题："),e("br"),t._v("\n找出字符串“TGTTACGG”和字符串“GGTTGACTA”的相似子串。")]),t._v(" "),e("p",[t._v("解：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("TG“TT AC”GG\nGG“TTGAC”TA\n引号内部分就是两字符串中的各自相似子串\n")])])]),e("h3",{attrs:{id:"算法历史及演进"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#算法历史及演进"}},[t._v("#")]),t._v(" 算法历史及演进")]),t._v(" "),e("p",[t._v("该算法由坦普尔·史密斯（Temple F. Smith）和迈克尔·沃特曼（Michael S. Waterman）于1981年提出。Smith-Waterman算法是Needleman-Wunsch算法的一个变体，二者都是动态规划算法。后来常用的序列比对算法例如FASTA和大名鼎鼎的BLAST也是基于这个算法改进的。")]),t._v(" "),e("h2",{attrs:{id:"算法过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#算法过程"}},[t._v("#")]),t._v(" 算法过程")]),t._v(" "),e("p",[t._v("Smith-Waterman算法分为两个步骤。"),e("br"),t._v("\n步骤1：通过两字符串构建“惩罚得分矩阵”。"),e("br"),t._v("\n步骤2：通过回溯“惩罚得分矩阵”以定位两字符串中的相似子串部分。")]),t._v(" "),e("h3",{attrs:{id:"构建惩罚得分矩阵"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#构建惩罚得分矩阵"}},[t._v("#")]),t._v(" 构建惩罚得分矩阵")]),t._v(" "),e("p",[t._v("以字符串“TGTTACGG”和“GGTTGACTA”为例，构建“惩罚得分矩阵”。")]),t._v(" "),e("p",[t._v("步骤1.1：通过两字符串长度生成一个(m+1)*(n+1)的二维矩阵，并初始化第一行和第一列的分数为零。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/fdc85fd8d9320d575ede48bdd96bcf26.jpg",alt:""}})]),t._v(" "),e("p",[t._v("步骤1.2：逐行确定无得分格子的分数。"),e("br"),t._v("\n步骤1.2.1：分数由该格子“左上”、“上”、“左”三个相邻格子的分数共同决定。如果该格子对应的两字符串中字符相同时，“左上”方向的分数为“左上”分数+3；反之为“左上”分数-3。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/6e33d1215d245827f6e82b39fe75820a.jpg",alt:""}}),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/44e22b9b3828c06c718cd3ebc4be0388.jpg",alt:""}})]),t._v(" "),e("p",[t._v("步骤1.2.2：“上”和“左”方向的分数为各自分数-2。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/0ca4378347eaf6b89a4caaccf41f5dee.jpg",alt:""}}),e("br"),t._v("\n这样三个方向的分数就都有了。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/712652e77829d9ba14df3a2075d9ddf7.jpg",alt:""}})]),t._v(" "),e("p",[t._v("步骤1.2.3：取这三个方向分数的最大值为该格子的分数。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/6399d75930b761566fb00dd3d5429404.jpg",alt:""}})]),t._v(" "),e("p",[t._v("步骤1.2.4：如果该分数为负，则该分数为零。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/9e541675a6ed93e1e10d8239f81aecd9.jpg",alt:""}})]),t._v(" "),e("p",[t._v("按如上步骤就可以构建完“惩罚得分矩阵”。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/8b04519447396bd544881858f5975da1.gif",alt:""}})]),t._v(" "),e("h3",{attrs:{id:"回溯惩罚得分矩阵"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#回溯惩罚得分矩阵"}},[t._v("#")]),t._v(" 回溯惩罚得分矩阵")]),t._v(" "),e("p",[t._v("我们可以知道“惩罚得分矩阵”的每个非零分数的格子是由哪个相邻格子决定的（来源格子）。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/c67a090f20bb1391687aa3faa98b7f08.jpg",alt:""}})]),t._v(" "),e("p",[t._v("步骤2.1：找到分数最高的那个格子。"),e("br"),t._v("\n步骤2.2：从分数最高格子开始，从它的“来源格子”中找到最大分数的那个格子，依次回溯到分数为零的格子为止，这样就可以确定x轴方向上的区间和y轴方向上的区间。这两个区间便可以映射到两个字符串的相似子串。"),e("br"),t._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2021/9/5593d80a35351b94eace1c07c63852c5.jpg",alt:""}})]),t._v(" "),e("h2",{attrs:{id:"代码实现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#代码实现"}},[t._v("#")]),t._v(" 代码实现")]),t._v(" "),e("h3",{attrs:{id:"java实现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#java实现"}},[t._v("#")]),t._v(" Java实现")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('void smith_waterman(String a, String b) {\n    int[][] scoreTable = new int[b.length() + 1][a.length() + 1];\n    int[][][][] sourceTable = new int[b.length() + 1][a.length() + 1][3][2];\n    // 构建惩罚得分矩阵\n    int[][] source_null = new int[][] {new int[] {-1, -1}, new int[] {-1, -1}, new int[] {-1, -1}};\n    for (int y = 0; y < b.length(); y++) {\n        String letterB = b.substring(y, y + 1);\n\tfor (int x = 0; x < a.length(); x++) {\n \t    String letterA = a.substring(x, x + 1);\n\t    int leftUpScore = scoreTable[y][x] + (letterA.equals(letterB) ? 3 : -3);\n\t    int upScore = scoreTable[y][x + 1] - 2;\n\t    int leftScore = scoreTable[y + 1][x] - 2;\n\t    int score = leftUpScore;\n\t    int[][] source = new int[][] {new int[] {x, y}, new int[] {-1, -1}, new int[] {-1, -1}};\n\t    if (upScore == score) {\n\t\tsource[1] = new int[] {y, x + 1};\n\t    } else if (upScore > score) {\n\t\tscore = upScore;\n\t\tsource = new int[][] {new int[] {-1, -1}, new int[] {y, x + 1}, new int[] {-1, -1}};\n\t    }\n\t    if (leftScore == score) {\n\t\tsource[2] = new int[] {y + 1, x};\n\t    } else if (leftScore > score) {\n\t\tscore = leftScore;\n\t\tsource = new int[][] {new int[] {-1, -1}, new int[] {-1, -1}, new int[] {y + 1, x}};\n\t    }\n\t    if (score < 0) {\n\t\tscore = 0;\n\t\tsourceTable[y + 1][x + 1] = source_null;\n\t    } else {\n\t\tsourceTable[y + 1][x + 1] = source;\n\t    }\n\t    scoreTable[y + 1][x + 1] = score;\n\t}\n    }\n    // 回溯惩罚得分矩阵\n    int maxScore = -1;\n    int maxX = -1;\n    int maxY = -1;\n    for (int y = 1; y < scoreTable.length; y++) {\n\tint[] row = scoreTable[y];\n\tfor (int x = 1; x < row.length; x++) {\n\t    if (maxScore < 0 || maxScore < row[x]) {\n\t\tmaxScore = row[x];\n\t\tmaxX = x;\n\t\tmaxY = y;\n\t    }\n\t}\n    }\n    if (maxScore > 0) {\n\tint minX = maxX;\n\tint minY = maxY;\n\twhile (true) {\n\t    int maxIndex = -1;\n\t    int[][] sources = sourceTable[minY][minX];\n\t    for (int i = 0; i < sources.length; i++) {\n\t\tint[] source = sources[i];\n\t\tif (source[0] >= 0) {\n\t\t    if (maxIndex < 0 || scoreTable[source[1]][source[0]] > scoreTable[sources[maxIndex][1]][sources[maxIndex][0]]) {\n\t\t\tmaxIndex = i;\n\t\t    }\n\t\t}\n\t    }\n\t    if (maxIndex >= 0) {\n\t\tif (scoreTable[sources[maxIndex][1]][sources[maxIndex][0]] > 0) {\n\t\t    minX = sources[maxIndex][0];\n\t\t    minY = sources[maxIndex][1];\n\t\t} else {\n\t\t    break;\n\t\t}\n\t    } else {\n\t\tbreak;\n\t    }\n\t}\n\tSystem.out.println(a + ": " + a.substring(minX - 1, maxX));\n\tSystem.out.println(b + ": " + b.substring(minY - 1, maxY));\n    }\n}\n')])])]),e("h3",{attrs:{id:"javascript实现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#javascript实现"}},[t._v("#")]),t._v(" Javascript实现")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('function smith_waterman(a, b) {\n    let scoreTable = new Array();\n    let sourceTable = new Object();\n    // 构建惩罚得分矩阵\n    for (let y = 0; y <= b.length; y++) {\n\tlet row = new Array();\n\tfor (let x = 0; x <= a.length; x++) {\n\t    row.push(0);\n\t}\n\tscoreTable.push(row);\n    }\n    for (let y = 1; y < scoreTable.length; y++) {\n\tlet letterB = b.substring(y - 1, y);\n\tfor (let x = 1; x < scoreTable[y].length; x++) {\n\t    let letterA = a.substring(x - 1, x);\n\t    let leftUpScore = scoreTable[y - 1][x - 1] + (letterA == letterB ? 3 : -3);\n\t    let upScore = scoreTable[y - 1][x] - 2;\n\t    let leftScore = scoreTable[y][x - 1] - 2;\n\t    let score = leftUpScore;\n\t    let source = [[x - 1, y - 1]];\n\t    if (upScore == score) {\n\t\tsource.push([y - 1, x]);\n\t    } else if (upScore > score) {\n\t\tscore = upScore;\n\t\tsource = [[y - 1, x]];\n\t    }\n\t    if (leftScore == score) {\n\t\tsource.push([y, x - 1]);\n\t    } else if (leftScore > score) {\n\t\tscore = leftScore;\n\t\tsource = [[y, x - 1]];\n\t    }\n\t    if (score < 0) {\n\t\tscore = 0;\n\t    } else {\n\t\tsourceTable[x + "_" + y] = source;\n\t    }\n\t    scoreTable[y][x] = score;\n\t}\n    }\n    // 回溯惩罚得分矩阵\n    let maxScore = -1;\n    let maxX = -1;\n    let maxY = -1;\n    for (let y = 1; y < scoreTable.length; y++) {\n\tfor (let x = 1; x < scoreTable[y].length; x++) {\n\t    if (maxScore < 0 || maxScore < scoreTable[y][x]) {\n\t\tmaxScore = scoreTable[y][x];\n\t\tmaxX = x;\n\t\tmaxY = y;\n\t    }\n\t}\n    }\n    if (maxScore > 0) {\n\tlet minX = maxX;\n\tlet minY = maxY;\n\twhile (true) {\n\t    if (sourceTable[minX + "_" + minY]) {\n\t\tlet sources = sourceTable[minX + "_" + minY];\n\t\tlet maxIndex = 0;\n\t\tfor (let i = 1; i < sources.length; i++) {\n\t\t    if (scoreTable[sources[i][1]][sources[i][0]] > scoreTable[sources[maxIndex][1]][sources[maxIndex][0]]) {\n\t\t\tmaxIndex = i;\n\t\t    }\n\t\t}\n\t\tif (scoreTable[sources[maxIndex][1]][sources[maxIndex][0]] > 0) {\n\t\t    minX = sources[maxIndex][0];\n\t\t    minY = sources[maxIndex][1];\n\t\t} else {\n\t\t    break;\n\t\t}\n\t    } else {\n\t\tbreak;\n\t    }\n\t}\n\tconsole.log(a + ": " + a.substring(minX - 1, maxX));\n\tconsole.log(b + ": " + b.substring(minY - 1, maxY));\n    }\n}\n')])])]),e("h2",{attrs:{id:"应用场景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[t._v("#")]),t._v(" 应用场景")]),t._v(" "),e("p",[t._v("Smith-Waterman算法来源于生物工程，所以该算法广泛应用于DNA比对等场景。")]),t._v(" "),e("p",[t._v("在公司产品中也有所使用。比如CMDB产品中，通过系统或业务日志来自动发现CI的过程中也使用了该算法。")]),t._v(" "),e("p",[t._v("再比如WiKi服务中有一项“划词评论”的功能。当读者在某一发布版本的文章中评论了一些词句，但是作者修改了内容生成了新版本的文章，这时候老版本上的评论定位必然会错乱，那么我们使用该算法依然可以帮助老评论定位到新版本文章的正确位置。")])])}),[],!1,null,null,null);e.default=a.exports}}]);