### 作业08 课堂签到小测

##### 第一题：

List the candidate keys for R. (2 points)

候选键：

- A
- E
- CD
- BC

##### 第二题：

$\{A\rightarrow BC,CD\rightarrow E,B\rightarrow D,E\rightarrow A\}$

##### 第三题：

$A\rightarrow ABC, A \rightarrow ADE$显然成立，所以是无损连接。

#### 评分标准

1. 候选键有4个A, BC, CD, E （2分）
2. A→B和A→C左边相同，应该合并。在函数依赖集F中，各项依赖左边都不同，而右边也没有多余属性，因此，正则覆盖集与F相同 （1分）
3. 无损覆盖必须满足R1∩R2 →R1或R1∩R2 →R2。因为R1 =(A,B,C)，R2 = (A, D, E)，所以 R1 ∩ R2 = A。因为A是候选键，所以R1 ∩ R2 → R1。由此该分解为无损分解。 （2分）
4. 随堂测验到场者，不扣分，不到场的，额外扣两分，扣完为止（2分）
