<template>
  <div class="methods">
    <h3>About</h3>
    <p>
      All of the questions in the quizzes are generated from the BJCP style guidelines and study guide. The guidelines have been translated to JSON for use on this project. Random question definitions are selected and then filled in with answer possibilities. 
    </p>
    <p>
      To make comparison question easier, I have added codings to characteristics in the style guide based on the words used. For example, the following table shows how I have coded carbonation.
    </p>
    <table class="outlined">
      <tr>
        <td>0</td><td>uncarbonated</td>
      </tr>
      <tr>
        <td>1</td><td>low</td>
      </tr>
      <tr>
        <td>2</td><td>moderately low</td>
      </tr>
      <tr>
        <td>3</td><td>moderate/medium</td>
      </tr>
      <tr>
        <td>4</td><td>moderate/medium high</td>
      </tr>
      <tr>
        <td>5</td><td>high</td>
      </tr>
      <tr>
        <td>6</td><td>very high</td>
      </tr>
    </table>

    <h4>References</h4>
    <ul>
      <li>
        <a href="https://www.bjcp.org/stylecenter.php">https://www.bjcp.org/stylecenter.php</a>
      </li>
      <li>
        <a href="https://github.com/jspies/BJCP_2015_extended">https://github.com/jspies/BJCP_2015_extended</a>
      </li>
      <li>
        <a href="https://github.com/SmedbergM/BJCP_2015">https://github.com/SmedbergM/BJCP_2015</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.methods {
  margin: 40px;
}
table.outlined {
  border-collapse: collapse;
  border: 1px solid #cfcfcf;
}
table.outlined tr {
  border: 1px solid #cfcfcf;
}
table.outlined td {
  border: 1px solid #cfcfcf;
  padding: 4px 10px;
}
table.outlined tr:nth-child(even) {
  background: #fff;
}
table.outlined td:nth-child(odd) {
  text-align: right;
}
</style>