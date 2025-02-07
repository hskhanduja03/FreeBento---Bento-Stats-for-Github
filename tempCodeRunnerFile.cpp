#include<bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin>>t;
    while(t--){
        int n, m;
        cin>>n;
        unordered_map<int, int> m1;
        unordered_map<int, int> m2;
        for(int i=0; i<n; i++){
            cin>>m;
            m1[m]++;
        }
        for(int i=0; i<n; i++){
            cin>>m;
            m2[m]++;
        }

        int odd1=0, odd2=0;
        for(auto i: m1){
            if(i.second%2!=0){
                odd1++;
            }
        }
        for(auto i: m2){
            if(i.second%2!=0){
                odd2++;
            }
        }
        if(odd1==odd2){
            cout<<"YES"<<endl;
        }
        else{
            cout<<"NO"<<endl;
        }
    }
} 