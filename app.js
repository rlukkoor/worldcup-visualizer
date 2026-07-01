/**
 * FIFA World Cup Member Archive - Core Application Logic
 */

// Application State Tracking
let currentView = 'members';
let activeConfedFilter = 'ALL';
let currentTimelineSubView = 'alpha';
let activeSelectedYear = null;

// Mock Dataset Structure — Replace this variable placeholder 
// with your true historical JSON object payload
const wcData = window.wcData || {
  countries: {},
  years: {}
};

/**
 * 1. Setup & initialization routines
 */
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Initial application configuration loop
  buildTimelineYearButtons();
  
  // Set up the default initial view loadouts
  const initialNavBtn = document.querySelector('header nav button.active') || document.querySelector('.nav-btn');
  const initialFilterBtn = document.querySelector('.filter-bar button.active') || document.querySelector('.filter-btn');
  
  switchView('members', initialNavBtn);
  filterConfed('ALL', initialFilterBtn);
}

/**
 * 2. View Switcher Framework
 */
function switchView(viewName, clickedButton) {
  currentView = viewName;
  const membersSection = document.getElementById('members-view');
  const yearsSection = document.getElementById('years-view');

  if (viewName === 'members') {
    if (membersSection) membersSection.classList.remove('hidden');
    if (yearsSection) yearsSection.classList.add('hidden');
  } else {
    if (yearsSection) yearsSection.classList.remove('hidden');
    if (membersSection) membersSection.classList.add('hidden');
  }

  // Handle active highlighting safe fallback check
  let targetNavBtn = clickedButton;
  if (!targetNavBtn) {
    targetNavBtn = Array.from(document.querySelectorAll('header nav button, .nav-btn')).find(
      btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${viewName}'`)
    );
  }
  handleActiveHighlight('header nav button, .nav-btn', targetNavBtn);
}

/**
 * 3. Sorting & Rendering Logic - Members View
 */
function getSortedCountryKeys(keysArray) {
  return [...keysArray].sort((a, b) => {
    const nameA = (wcData.countries[a]?.name || '').toLowerCase();
    const nameB = (wcData.countries[b]?.name || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

function filterConfed(confedCode, clickedButton) {
  activeConfedFilter = confedCode;
  handleActiveHighlight('.filter-bar button, .filter-btn', clickedButton);

  const gridElement = document.getElementById('flag-grid');
  if (!gridElement) return;
  gridElement.innerHTML = '';

  // Filter country data array based on selected criteria
  let targetKeys = Object.keys(wcData.countries);
  if (confedCode !== 'ALL') {
    targetKeys = targetKeys.filter(key => wcData.countries[key]?.confed === confedCode);
  }

  // Force strict absolute alphabetical sorting by country name string
  const sortedKeys = getSortedCountryKeys(targetKeys);

  sortedKeys.forEach(key => {
    const country = wcData.countries[key];
    const card = document.createElement('div');
    card.className = 'flag-card';
    card.onclick = () => openCountryModal(key);

    card.innerHTML = `
      <span class="flag-icon fi fi-${country.flag}"></span>
      <div class="flag-country-name">${country.name}</div>
    `;
    gridElement.appendChild(card);
  });
}

/**
 * 4. Sorting & Rendering Logic - Timeline View
 */
function buildTimelineYearButtons() {
  const container = document.getElementById('years-buttons');
  if (!container) return;
  container.innerHTML = '';

  // Map chronological list across tournament entries
  const chronologicalYears = Object.keys(wcData.years).sort((a, b) => parseInt(a) - parseInt(b));

  chronologicalYears.forEach(year => {
    const tournament = wcData.years[year];
    const button = document.createElement('button');
    button.className = 'year-btn';
    button.innerText = year;

    if (tournament.status === 'cancelled') {
      button.classList.add('cancelled');
      button.title = `Tournament Cancelled (${tournament.reason || 'WWII'})`;
    } else {
      button.onclick = () => showYearDetails(year, button);
    }

    container.appendChild(button);
  });
}

function switchTimelineSubView(subView) {
  currentTimelineSubView = subView;
  
  const alphaTab = document.getElementById('tab-timeline-alpha');
  const confedTab = document.getElementById('tab-timeline-confed');
  
  if (alphaTab && confedTab) {
    if (subView === 'alpha') {
      alphaTab.classList.add('active');
      confedTab.classList.remove('active');
    } else {
      confedTab.classList.add('active');
      alphaTab.classList.remove('active');
    }
  }

  if (activeSelectedYear) {
    renderYearParticipants(activeSelectedYear);
  }
}

function showYearDetails(year, clickedButton) {
  activeSelectedYear = year;
  handleActiveHighlight('#years-buttons .year-btn', clickedButton);

  const detailsSection = document.getElementById('year-details');
  const titleElement = document.getElementById('selected-year-title');
  
  if (!detailsSection || !titleElement) return;
  
  titleElement.innerText = `🏆 ${year} Tournament Participants`;
  detailsSection.classList.remove('hidden');

  renderYearParticipants(year);
}

function renderYearParticipants(year) {
  const container = document.getElementById('year-participants');
  if (!container) return;
  container.innerHTML = '';

  const tournament = wcData.years[year];
  if (!tournament || !tournament.participants) {
    container.innerHTML = '<p class="text-muted">No participant data recorded for this year.</p>';
    return;
  }

  const participantKeys = tournament.participants;

  if (currentTimelineSubView === 'alpha') {
    // Mode A: Render standard uniform layout sorted alphabetically
    container.className = 'flag-grid';
    const sortedKeys = getSortedCountryKeys(participantKeys);
    
    sortedKeys.forEach(key => {
      container.appendChild(createParticipantCard(key));
    });

  } else {
    // Mode B: Split elements vertically by geographical confederation grouping
    container.className = 'confed-timeline-container';
    
    const confedOrder = ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];
    
    confedOrder.forEach(confed => {
      const confedKeys = participantKeys.filter(key => wcData.countries[key]?.confed === confed);
      if (confedKeys.length === 0) return; // Skip empty brackets

      const sortedConfedKeys = getSortedCountryKeys(confedKeys);

      const groupBlock = document.createElement('div');
      groupBlock.className = 'confed-group-block';
      groupBlock.innerHTML = `<h3 class="confed-group-title">${confed} <span class="text-muted">(${sortedConfedKeys.length})</span></h3>`;

      const subGrid = document.createElement('div');
      subGrid.className = 'flag-grid';

      sortedConfedKeys.forEach(key => {
        subGrid.appendChild(createParticipantCard(key));
      });

      groupBlock.appendChild(subGrid);
      container.appendChild(groupBlock);
    });
  }
}

function createParticipantCard(key) {
  const country = wcData.countries[key] || { name: key, flag: 'un' };
  const card = document.createElement('div');
  card.className = 'flag-card';
  card.onclick = () => openCountryModal(key);
  card.innerHTML = `
    <span class="flag-icon fi fi-${country.flag}"></span>
    <div class="flag-country-name">${country.name}</div>
  `;
  return card;
}

/**
 * 5. Historical Analysis Modal Overlay & Charts
 */
let performanceChart = null;

function openCountryModal(countryKey) {
  const country = wcData.countries[countryKey];
  if (!country) return;

  const modal = document.getElementById('chart-modal');
  const title = document.getElementById('modal-country-name');
  if (!modal || !title) return;

  title.innerText = `${country.name} — Performance History`;
  modal.classList.remove('hidden');

  // Destroy previous Chart instance to clear memory footprints
  if (performanceChart) {
    performanceChart.destroy();
  }

  // Parse charting configurations arrays
  const labels = [];
  const points = [];

  Object.keys(wcData.years).sort((a,b) => parseInt(a) - parseInt(b)).forEach(year => {
    const tournament = wcData.years[year];
    if (tournament.status === 'cancelled') return;

    if (tournament.participants && tournament.participants.includes(countryKey)) {
      labels.push(year);
      // Fetch precise positioning metadata or fall back to baseline flag integer
      const finishPos = tournament.results?.[countryKey] || 16; 
      points.push(finishPos);
    }
  });

  const ctx = document.getElementById('historyChart');
  if (!ctx) return;

  performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Finishing Position',
        data: points,
        borderColor: '#0070f3',
        backgroundColor: 'rgba(0, 112, 243, 0.1)',
        borderWidth: 2,
        tension: 0.15,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          reverse: true, // Rank 1 at top
          min: 1,
          ticks: { stepSize: 4 }
        }
      }
    }
  });
}

function closeModal() {
  const modal = document.getElementById('chart-modal');
  if (modal) modal.classList.add('hidden');
  if (performanceChart) {
    performanceChart.destroy();
    performanceChart = null;
  }
}

/**
 * 6. Global Utility Helpers
 */
function handleActiveHighlight(selectorGroup, activeElement) {
  if (!activeElement) return;
  const elements = document.querySelectorAll(selectorGroup);
  elements.forEach(el => el.classList.remove('active'));
  activeElement.classList.add('active');
}
