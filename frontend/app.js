console.log('Hello, world!');
const githubAuthButton = document.getElementById('github-auth-button');
const createRepoButton = document.getElementById('create-repo-button');
console.log('lasjdf')
if (githubAuthButton){
  githubAuthButton.addEventListener('click', () => {
    console.log("hlskdjf")
    window.location.href = 'http://localhost:3000/auth/github';
  });
}

if (createRepoButton){
  createRepoButton.addEventListener('click', async () => {
    console.log("hello")
    const response = await fetch('http://localhost:3000/auth/repo', {
      method: 'POST',
    });
    const repository = await response.json();
    console.log(repository);
  });
}

