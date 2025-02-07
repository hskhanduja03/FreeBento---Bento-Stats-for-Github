#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n;
    cin >> n;
    vector<int> a(n), b(n);
    
    for (int &x : a) cin >> x;
    for (int &x : b) cin >> x;

    // a को sort कर लो ताकि हम इसे सही तरीके से rearrange कर सकें
    sort(a.begin(), a.end());

    // c[i] = a[i] + b[i]
    set<int> unique_sums;
    for (int i = 0; i < n; i++) {
        unique_sums.insert(a[i] + b[i]);
    }

    if (unique_sums.size() >= 3) {
        cout << "YES\n";
    } else {
        cout << "NO\n";
    }
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
}
