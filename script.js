document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', () => {
        const groupCountInput = document.getElementById('group-count');
        const studentDataInput = document.getElementById('student-data');
        const resultContainer = document.getElementById('result-container');

        const numGroups = parseInt(groupCountInput.value);
        const rawText = studentDataInput.value.trim();

        if (!rawText) {
            alert('학생 명단과 성적을 입력해주세요.');
            return;
        }

        // 1. 데이터 파싱
        const lines = rawText.split('\n');
        let students = [];

        for (let line of lines) {
            const parts = line.split(',');
            if (parts.length >= 2) {
                const name = parts[0].trim();
                const score = parseFloat(parts[1].trim());
                if (name && !isNaN(score)) {
                    students.push({ name, score });
                }
            }
        }

        if (students.length === 0) {
            alert('올바른 형식(이름,점수)으로 입력해주세요.');
            return;
        }

        // 2. 성적 기준 내림차순 정렬 (높은 점수부터)
        students.sort((a, b) => b.score - a.score);

        // 3. S자(Snake Draft) 방식으로 모둠 할당
        let groups = Array.from({ length: numGroups }, () => []);
        let groupIndex = 0;
        let direction = 1; // 1: 순방향, -1: 역방향

        for (let i = 0; i < students.length; i++) {
            groups[groupIndex].push(students[i]);

            groupIndex += direction;

            // 모둠 끝에 도달하면 방향을 꺾음
            if (groupIndex >= numGroups) {
                groupIndex = numGroups - 1;
                direction = -1;
            } else if (groupIndex < 0) {
                groupIndex = 0;
                direction = 1;
            }
        }

        // 4. 결과 화면에 렌더링
        resultContainer.innerHTML = '';
        groups.forEach((group, index) => {
            const card = document.createElement('div');
            card.className = 'feature-card';
            
            let htmlContent = `<h3>${index + 1} 모둠</h3><ul>`;
            let totalScore = 0;

            group.forEach(member => {
                htmlContent += `<li>${member.name} (${member.score}점)</li>`;
                totalScore += member.score;
            });

            const avgScore = group.length > 0 ? (totalScore / group.length).toFixed(1) : 0;
            htmlContent += `</ul><p style="margin-top:0.75rem; font-size:0.85rem; color:#6b7280;">평균 점수: ${avgScore}점</p>`;
            
            card.innerHTML = htmlContent;
            resultContainer.appendChild(card);
        });
    });
});
